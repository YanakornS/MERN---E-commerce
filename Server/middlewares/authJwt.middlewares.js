const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

//Verify Token
verifyToken = (req, res, next) => {
  // รับ Token จาก header
  const token = req.headers["x-access-token"];
  // ตรวจสอบว่า Token มีหรือไม่
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Access Forbidden!!" });
    req.email = decoded.email;
    req.role = decoded.role;

    next();
  });
};

isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: " Require Admin Role" });
  }
  next();
};

const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;
