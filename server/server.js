const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/dbConnnection"); // Corrected typo in filename
const PORT = process.env.PORT || 3001;

connectDB();

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
const uploadRoute = require("./middlewares/upload");

// Use the upload route
app.use("/upload", uploadRoute);
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

mongoose.connection.once("open", () => {
  console.log("Connected to the MongoDB");
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
});
