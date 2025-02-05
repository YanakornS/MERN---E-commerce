const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cart.controllers");

router.post("/", cartController.createCart);
router.get("/", cartController.getAllCartItems);
router.get("/:email", cartController.getCartItemsByEmail);
router.put("/:id", cartController.updateCartItem);
router.delete("/:id", cartController.deleteCartItem);
router.delete("/clear/:email", cartController.clearAllItems);
module.exports = router;
