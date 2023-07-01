const express = require("express");
const restRouter = express.Router();

const { restaurant } = require("../models/index");
const { userCollection } = require("../models/index");

const bearerAuth = require("../auth/middleware/bearer");
const acl = require("../auth/middleware/acl");

// restRouter.get("/restaurants", bearerAuth, acl('read'), getrestaurant);
// restRouter.get("/restaurants/:id", bearerAuth, acl('read'), getOnerestaurant);
// restRouter.post("/restaurants", bearerAuth, acl('create'), createrestaurant);
// restRouter.put("/restaurants/:id", bearerAuth, acl('update'), updaterestaurant);
// restRouter.delete("/restaurants/:id", bearerAuth, acl('delete'), deleterestaurant);
// restRouter.get("/ownerRest/:id", bearerAuth, acl('read'), getUserRest);

restRouter.get("/restaurants", getrestaurant);
restRouter.get("/restaurant/:id", getOnerestaurant);
restRouter.post("/restaurant", createrestaurant);
restRouter.put("/restaurant/:id", updaterestaurant);
restRouter.delete("/restaurant/:id", deleterestaurant);
restRouter.get("/ownerRests/:id", getUserRest);

async function getrestaurant(req, res) {
  let restaurantRecord = await restaurant.get();
  res.status(200).json(restaurantRecord);
}
async function getOnerestaurant(req, res) {
  let id = parseInt(req.params.id);
  let restaurantRecord = await restaurant.get(id);
  res.status(200).json(restaurantRecord);
}
async function createrestaurant(req, res) {
  let restaurantData = req.body;
  let restaurantRecord = await restaurant.create(restaurantData);
  res.status(201).json(restaurantRecord);
}
async function updaterestaurant(req, res) {
  let id = parseInt(req.params.id);
  let restaurantData = req.body;
  let restaurantRecord = await restaurant.update(id, restaurantData);
  res.status(201).json(restaurantRecord);
}
async function deleterestaurant(req, res) {
  let id = parseInt(req.params.id);
  let restaurantRecord = await restaurant.delete(id);
  res.status(204).json(restaurantRecord);
}

async function getUserRest(req, res) {
  let id = parseInt(req.params.id);
  const favs = await userCollection.readHasMany(id, restaurant.model);
  res.status(200).json(favs);
}

const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/restaurants/list',
    params: {
      location_id: '293986',
      currency: 'USD',
      lunit: 'km',
      limit: '30',
      open_now: 'false',
      lang: 'en_US'
    },
    headers: {
      'X-RapidAPI-Key': 'f95fad8474mshfda9db1236f9ff1p1cd619jsn8fa818dcf78b',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };

  restRouter.post('/addR', addHandler)

  async function addHandler(req, res) {
    axios.request(options).then((data) => {
        data.data.data.map( (item) => {

            let restaurantData = {
                "name":item.name,
                 "img":item.photo?.images?.large?.url,
                 "description": item.description,
                  "location":item.address,
                 "rating": item.rating,
                 "phone": item.phone,
                 "email": item.email,
                 "website": item.website,
                 "ownerId":1};

 restaurant.create(restaurantData);
        })
        res.status(200).json('done');
    });
}
module.exports = restRouter;
