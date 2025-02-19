require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;
const DB_URL = process.env.DB_URL;
const swaggerUi = require("swagger-ui-express");
const cartRouter = require("./routers/cart.router");
const swaggerDocument = require("./docs/swagger-output.json");
const userRouter = require("./routers/user.router");
const productRouter = require("./routers/product.router");
const path = require("path");
try {
  mongoose.connect(DB_URL);
  console.log("Connect to MongoDB Successfully");
} catch (error) {
  console.log("DB Connect Faile");
}

const app = express();

app.use(cors({ origin: BASE_URL, credentials: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome  To MERN E-Commerce </h1>");
});
//Use Router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(PORT, () => {
  console.log("Server in Running http://localhost:" + PORT);
});
