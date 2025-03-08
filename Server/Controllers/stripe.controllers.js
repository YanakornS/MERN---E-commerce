const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const OrderModel = require("../Models/Order.model");
const CartModel = require("../Models/Carts.model");

exports.createCheckOutSession = async (req, res) => {
  try {
    const cartItems = req.body.cart;
    console.log(cartItems);

    const products = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    // สร้าง Customer
    const customer = await stripe.customers.create({
      metadata: {
        email: req.body.email.toString(),
        cart: JSON.stringify(products),
      },
    });

    // รายการสินค้า
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "thb",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.name,
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // สร้าง Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "promptpay"],
      shipping_address_collection: {
        allowed_countries: ["TH"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "thb" },
            display_name: "Free Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 4500, currency: "thb" },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 1 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      line_items,
      customer: customer.id,
      mode: "payment",
      success_url: `${process.env.BASE_URL}/checkout-success`,
      cancel_url: `${process.env.BASE_URL}/cart`,
    });

    console.log("Customer Created:", customer);

    res.send({ url: session.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).send({ message: error.message });
  }
};

// ฟังก์ชันล้างตะกร้าหลังจากชำระเงินสำเร็จ
const clearCart = async (email) => {
  try {
    await CartModel.deleteMany({ email });
    console.log("Cart Cleared");
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something error occurred white  Clearing Cart",
    });
  }
};

// ฟังก์ชันสร้างคำสั่งซื้อ
const createOrder = async (customer, data, status = "completed", res) => {
  try {
    const products = JSON.parse(customer.metadata.cart);
    const subtotal = (data.amount_subtotal ?? data.amount ?? 0) / 100;
    const total = (data.amount_total ?? data.amount ?? 0) / 100;
    const shipping = data.customer_details || data.shipping || { address: {} };


    console.log("Products:", products);

    const newOrder = await OrderModel.create({
      email: customer.metadata.email,
      customerId: data.customer,
      products: products,
      subtotal: subtotal,
      total: total ,
      shipping: shipping,
      payment_status: data.payment_status,
      delivery_status: status === "completed" ? "pending" : "canceled",
    });

    console.log("Order Created:", newOrder);
    await clearCart(customer.metadata.email);
  } catch (error) {
    console.error("Error creating order:", error.message);
    if (res) {
      return res.status(500).json({
        message: error.message || "Something error occurred while creating order",
      });
    }
  }
};


exports.webhook = async (req, res) => {
  console.log("Webhook triggered...");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

 
  console.log("Stripe Event:", JSON.stringify(event, null, 2));

  const data = event.data?.object; 
  console.log("Stripe Data Object:", data);

  switch (event.type) {
    case "checkout.session.completed":
      console.log("Payment received.");
      try {
        const customer = await stripe.customers.retrieve(data.customer);
        await createOrder(customer, data, "completed", res);
      } catch (error) {
        console.error("Error creating order:", error.message);
        return res.status(500).json({ message: "Webhook Error" });
      }
      break;

      case "payment_intent.payment_failed":
      console.log(" Payment failed:");
      console.log("Stripe Data:", JSON.stringify(data, null, 2));    
      try {
        const customer = await stripe.customers.retrieve(data.customer);
        await createOrder(customer, data, "failed", res);
      } catch (error) {
        console.error("Error processing failed payment:", error.message);
        return res.status(500).json({ message: "Webhook Error" });
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).end();
};
