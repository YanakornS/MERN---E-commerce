const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/order.controllers");

router.get("/", OrderController.getAllOrders);
router.get("/:id", OrderController.getOrderById);
router.get("/:email", OrderController.getOrdersByEmail);

router.put("/:id", OrderController.updateOrderDetail);
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
