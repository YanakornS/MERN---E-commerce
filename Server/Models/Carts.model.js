const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const CartModel = model("Cart", CartSchema);

module.exports = CartModel;
