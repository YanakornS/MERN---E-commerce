const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/order.controllers");

router.get("/", OrderController.getAllOrders);
// router.get("/:email", OrderController.getOrdersByEmail);
// router.get("/order/:id", OrderController.getOrderById);
// router.post("/", OrderController.createOrder);
// router.put("/:id", OrderController.updateOrderStatus);
// router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
