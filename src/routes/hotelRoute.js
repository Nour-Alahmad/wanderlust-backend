const express = require("express");
const hotelRouter = express.Router();

const { hotel } = require("../models/index");
const { userCollection } = require("../models/index");

const bearerAuth = require("../auth/middleware/bearer");
const acl = require("../auth/middleware/acl");

// hotelRouter.get("/hotels", bearerAuth, acl('read'), gethotel);
// hotelRouter.get("/hotels/:id", bearerAuth, acl('read'), getOnehotel);
// hotelRouter.post("/hotels", bearerAuth, acl('create'), createhotel);
// hotelRouter.put("/hotels/:id", bearerAuth, acl('update'), updatehotel);
// hotelRouter.delete("/hotels/:id", bearerAuth, acl('delete'), deletehotel);
// hotelRouter.get("/ownerhotel/:id", bearerAuth, acl('read'), getUserhotel);

hotelRouter.get("/hotels", gethotel);
hotelRouter.get("/hotel/:id", getOnehotel);
hotelRouter.post("/hotel", createhotel);
hotelRouter.put("/hotel/:id", updatehotel);
hotelRouter.delete("/hotel/:id", deletehotel);
hotelRouter.get("/ownerhotels/:id", getUserhotel);

async function gethotel(req, res) {
  let hotelRecord = await hotel.get();
  res.status(200).json(hotelRecord);
}
async function getOnehotel(req, res) {
  let id = parseInt(req.params.id);
  let hotelRecord = await hotel.get(id);
  res.status(200).json(hotelRecord);
}
async function createhotel(req, res) {
  let hotelData = req.body;
  let hotelRecord = await hotel.create(hotelData);
  res.status(201).json(hotelRecord);
}
async function updatehotel(req, res) {
  let id = parseInt(req.params.id);
  let hotelData = req.body;
  let hotelRecord = await hotel.update(id, hotelData);
  res.status(201).json(hotelRecord);
}
async function deletehotel(req, res) {
  let id = parseInt(req.params.id);
  let hotelRecord = await hotel.delete(id);
  res.status(204).json(hotelRecord);
}

async function getUserhotel(req, res) {
  let id = parseInt(req.params.id);
  const favs = await userCollection.readHasMany(id, hotel.model);
  res.status(200).json(favs);
}

// const axios = require("axios");

// const options = {
//     method: 'GET',
//     url: 'https://travel-advisor.p.rapidapi.com/hotels/list',
//     params: {
//       location_id: '293986',
//       adults: '2',
//       rooms: '2',
//       nights: '2',
//       offset: '0',
//       currency: 'USD',
//       order: 'asc',
//       sort: 'recommended',
//       lang: 'en_US'
//     },
//     headers: {
//       'X-RapidAPI-Key': 'f95fad8474mshfda9db1236f9ff1p1cd619jsn8fa818dcf78b',
//       'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//     }
//   };

// hotelRouter.post("/add", addHandler);

// async function addHandler(req, res) {
//   axios.request(options).then((data) => {
//     data.data.data.map((item) => {
//       let hotelData = {
//         name: item.name,
//         img: item.photo?.images?.large?.url,
//         rating: item.rating,
//         phone: item.phone,
//         email: item.email,
//         price: item.price,
//         ownerId: 1,
//       };
//       hotel.create(hotelData);
//     });
//     res.status(200).json("done");
//   });
// }

module.exports = hotelRouter;
