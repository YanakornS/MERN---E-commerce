const express = require("express");
const router = express.Router();
const productController = require("../Controllers/product.controllers");
const { upload, uploadToFirebase } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/authJwt.middlewares");

//http://localhost:5000/api/v1/auth/post

router.post("/", upload, uploadToFirebase, productController.createProduct);

// GET: Get all posts
router.get("/", productController.getProducts);

// GET: GetBYID posts
router.get("/:id", productController.getProductById);

router.get("/author/:id", productController.getProductByAuthor);

// Delete: Delete  posts ByID
router.delete("/:id", productController.deleteProduct);

// Delete: Update posts ByID
router.put("/:id", upload, uploadToFirebase, productController.updateProduct);

module.exports = router;
