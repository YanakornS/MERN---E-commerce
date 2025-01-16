require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome  To MERN E-Commerce </h1>");
});

app.listen(PORT, () => {
  console.log("Server in Running http://localhost:" + PORT);
});
