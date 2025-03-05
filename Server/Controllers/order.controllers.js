const OrderModel = require("../Models/Order.model");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    console.error(" Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};
