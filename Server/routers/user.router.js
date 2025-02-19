const express = require("express");
const userController = require("../Controllers/user.controllers");
const router = express.Router();

//http://localhost:5000/api/v1/auth/register

router.post("/sign", userController.sign);

router.post("/", userController.addUser);

module.exports = router;
