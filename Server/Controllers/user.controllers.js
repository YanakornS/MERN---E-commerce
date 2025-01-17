const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");
const salt = bcrypt.genSaltSync(10);
const SECRET = process.env.SECRET;

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({
      message: "Please provide all required fields",
    });
  }

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, SECRET, {
      expiresIn: "1h",
    });

    return res.send({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
      },
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal Server Error:Authentication Failed",
    });
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please provide all requried fields",
    });
    return;
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({ username, password: hashedPassword });
    res.send({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while registering a new user",
    });
  }
};
