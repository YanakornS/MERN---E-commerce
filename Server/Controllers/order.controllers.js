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

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Fetching order with ID:", id);

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid Order ID" });
    }

    const orderDoc = await OrderModel.findById(id).populate(
      "products.productId"
    );

    if (!orderDoc) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(orderDoc);
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching order details",
      error: error.message,
    });
  }
};
exports.updateOrderDetail = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "id is require" });
  }
  try {
    const orderDetail = await OrderModel.findById(id);
    if (!orderDetail) {
      return res.status(404).json({ message: "Order not found" });
    }
    const { delivery_status } = req.body;
    if (!delivery_status) {
      return res.status(400).json({ message: "deliver_status is require" });
    }
    orderDetail.delivery_status = delivery_status;
    await orderDetail.save();
    res.json(orderDetail);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something error occurred while Updating order detail",
    });
  }
};

exports.getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await OrderModel.find({ email }).populate(
      "products.productId"
    );
    res.status(200).json(orders);
  } catch (error) {
    console.error(" Error fetching orders by email:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};
