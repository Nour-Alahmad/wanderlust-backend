const express = require("express");
const bookRoute = express.Router();

const { booking } = require("../models/index");
const { userCollection } = require("../models/index");

const bearerAuth = require("../auth/middleware/bearer");
const acl = require("../auth/middleware/acl");

// bookRoute.get("/restfav", bearerAuth, acl('read'), getbookings);
// bookRoute.post("/restfav", bearerAuth, acl('createForUser'), createbookings);
// bookRoute.delete("/restfav/:id", bearerAuth, acl('deleteForUser'), deletebookings);
// bookRoute.get("/userbookings/:id", bearerAuth, acl('read'), getUserbookings);

bookRoute.get("/bookings", getbookings);
bookRoute.post("/booking", createbookings);
bookRoute.delete("/booking/:id", deletebookings);
bookRoute.get("/userbookings/:id", getUserbookings);

async function getbookings(req, res) {
  let bookingsRecord = await booking.get();
  res.status(200).json(bookingsRecord);
}

async function createbookings(req, res) {
  let bookingsData = req.body;
  let bookingsRecord = await booking.create(bookingsData);
  res.status(201).json(bookingsRecord);
}

async function deletebookings(req, res) {
  let id = parseInt(req.params.id);
  let bookingsRecord = await booking.delete(id);
  res.status(204).json(bookingsRecord);
}

async function getUserbookings(req, res) {
  let id = parseInt(req.params.id);
  const bookings = await userCollection.readHasMany(id, booking.model);
  res.status(200).json(bookings);
}

module.exports = bookRoute;
