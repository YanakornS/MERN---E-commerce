const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user.model");

const SECRET = process.env.SECRET;

exports.sign = async (req, res) => {
  const { email, role } = req.body;
  //check email is existing in db
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  //sign jwt token
  const token = jwt.sign({ email: user.email, role: user.role }, SECRET, {
    expiresIn: "1h",
  });
  const userInfo = {
    email: user.email,
    role: user.role,
  };
  res.status(200).json({ token, userInfo });
};

exports.addUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email are required" });
    }

    // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    // สร้างผู้ใช้ใหม่
    const newUser = new UserModel({ email });
    await newUser.save();

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while adding a new user",
      error: error.message,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, "email role createdAt");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        email,
        role,
      },
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while updating user",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    !user
      ? res.status(404).json({ message: "User not found" })
      : res.status(200).json({ message: "User was deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while deleting user",
      error: error.message,
    });
  }
};

exports.makeAdmin = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.role = "admin";
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    {
      res.status(500).json({
        message: "Something error occurred while changing user role to admin",
        error: error.message,
      });
    }
  }
};
exports.makeUser = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.role = "user";
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    {
      res.status(500).json({
        message: "Something error occurred while changing user role to user",
        error: error.message,
      });
    }
  }
};

exports.getRoleByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }
    res.status(200).json({ role: user.role });
  } catch (error) {
    {
      res.status(500).json({
        message: "Something error occurred while changing user role to user",
        error: error.message,
      });
    }
  }
};
