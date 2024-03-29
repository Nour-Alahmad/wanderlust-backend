"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const authRouter = require("./auth/routes");
const restRouter = require("./routes/restRoute");
const hotelRouter = require("./routes/hotelRoute");
const bookingRouter = require("./routes/bookRoute");
const favRouter = require("./routes/favRoute");

const errorHandler = require("./error-handlers/500.js");
const notFound = require("./error-handlers/404.js");

app.use(cors());
app.use(express.json());

// App Level MW
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(restRouter);
app.use(favRouter);
app.use(hotelRouter);
app.use(bookingRouter);
app.use(authRouter);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the API!");
});

// Catchalls
app.use("*", notFound);
app.use(errorHandler);

module.exports = {
  app: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
