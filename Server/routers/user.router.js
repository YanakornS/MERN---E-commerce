const express = require("express");
const userController = require("../Controllers/user.controllers");
const router = express.Router();
const authJwt = require("../middlewares/authJwt.middlewares");

//http://localhost:5000/api/v1/auth/register

router.post("/sign", userController.sign);

router.post("/", userController.addUser);

router.get("/", userController.getAllUsers);

router.get("/role/:email", userController.getRoleByEmail);

router.delete(
  "/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.deleteUser
);

router.put(
  "/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.updateUser
);

router.patch(
  "/admin/:email",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.makeAdmin
);

router.patch(
  "/user/:email",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.makeUser
);

module.exports = router;
