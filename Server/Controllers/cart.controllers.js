const CartModel = require("../Models/Carts.model");

exports.createCart = async (req, res) => {
  /*
    #swagger.tags = ['Carts']
    #swagger.summary = "Add a Cart Item"
    #swagger.description = 'Endpoint to Create Cart'
  */
  const { productId, name, email, image, quantity, price } = req.body;
  if (!productId || !name || !email || !image || !quantity || !price) {
    return res.status(400).json({ message: "Product information is missing" });
  }
  try {
    //Existing item in out cart
    const existingItem = await CartModel.findOne({ productId, email });
    if (existingItem) {
      existingItem.quantity += quantity;
      const data = await existingItem.save();
      return res.send(data);
    }
    //add item to cart for the first time
    const cart = new CartModel({
      productId,
      name,
      email,
      image,
      quantity,
      price,
    });
    const data = await cart.save();
    res.send(data);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something error occurred white adding new cart item",
    });
  }
};

exports.getAllCartItems = async (req, res) => {
  /*
    #swagger.tags = ['Carts']
    #swagger.summary = "Return the  list of all the cart items"
    #swagger.description = 'Endpoint to Get All Items'
  */
  try {
    const cartItems = await CartModel.find({});
    if (!cartItems) {
      return res.status(404).json({ message: "No Cart Items found" });
    }
    res.json(cartItems);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something went wrong while getting cart items ",
    });
  }
};

exports.getCartItemsByEmail = async (req, res) => {
  /*
    #swagger.tags = ['Carts']
    #swagger.summary = " Return the list  of all the cart items By Email"
    #swagger.description = 'Return the list  of all the cart items By Emai'
  */
  const { email } = req.params;
  if (!email) {
    res.status(400).json({ message: "Product information is missing" });
    return;
  }
  try {
    const cartItems = await CartModel.find({ email });

    if (!cartItems || cartItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No cart items found for this user" });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong while getting cart items",
    });
  }
};

exports.updateCartItem = async (req, res) => {
  /*
    #swagger.tags = ['Carts']
    #swagger.summary = " updateCartItem"
    #swagger.description = 'updateCartItemByemail'
  */
  const { id } = req.params;
  try {
    const cartItems = await CartModel.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false,
    });

    if (!cartItems) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something went wrong while updating the cart item",
    });
  }
};

exports.deleteCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCartItem = await CartModel.findByIdAndDelete(id);
    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something went wrong while deleting the cart item",
    });
  }
};

exports.clearAllItems = async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const result = await CartModel.deleteMany({ email });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No cart items found for this user" });
    }

    res.status(200).json({
      message: "All cart items have been cleared successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong while clearing the cart",
    });
  }
};
