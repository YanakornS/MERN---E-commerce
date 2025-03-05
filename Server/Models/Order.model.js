const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    email: { type: String, required: true },
    customerId: { type: String, required: true },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    subtotal: { type: String, required: true },
    total: { type: Number, required: true, default: 0 },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, required: true, default: "pending" },
    payment_status: { type: String, required: true, default: "unpaid" },
  },
  {
    timestamps: true,
  }
);

const OrderModel = model("Order", OrderSchema);

module.exports = OrderModel;
