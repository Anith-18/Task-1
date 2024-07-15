
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require('./UserRoute');
const postRoutes = require("./PostRoute")
const helmet = require("helmet")

mongoose.connect(
  "mongodb://127.0.0.1/dbbase");
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/user", userRoutes);
app.use("/post", postRoutes)

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
