const ProductModel = require("../Models/products.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

// Create Post controller
exports.createPost = async (req, res) => {
  // File upload
  const { path: image } = req.file;
  const { name, description, price, category } = req.body;
  if (!name || !description || !price || image || !category) {
    return res.status(400).json({ message: "All fields is required" });
  }
  const postDoc = await ProductModel.create({
    name,
    description,
    price,
    image,
    category,
  });
  res.json(postDoc);
};
