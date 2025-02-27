const express = require("express");
const router = express.Router();
const stripeController = require("../Controllers/stripe.controllers");

router.post("/create-checkout-session", stripeController.createCheckOutSession);

module.exports = router;
