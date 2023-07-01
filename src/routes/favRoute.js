const express = require("express");
const favRouter = express.Router();

const { favs } = require("../models/index");
const { userCollection } = require("../models/index");

const bearerAuth = require("../auth/middleware/bearer");
const acl = require("../auth/middleware/acl");

// favRouter.get("/favs", bearerAuth, acl('read'), getfavs);
// favRouter.post("/favs", bearerAuth, acl('createForUser'), createfavs);
// favRouter.delete("/favs/:id", bearerAuth, acl('deleteForUser'), deletefavs);
// favRouter.get("/userfavs/:id", bearerAuth, acl('read'), getUserFavs);

favRouter.get("/favs", getfavs);
favRouter.post("/fav", createfavs);
favRouter.delete("/fav/:id", deletefavs);
favRouter.get("/userfavs/:id", getUserFavs);

async function getfavs(req, res) {
  let favsRecord = await favs.get();
  res.status(200).json(favsRecord);
}

async function createfavs(req, res) {
  let favsData = req.body;
  let favsRecord = await favs.create(favsData);
  res.status(201).json(favsRecord);
}

async function deletefavs(req, res) {
  let id = parseInt(req.params.id);
  let favsRecord = await favs.delete(id);
  res.status(204).json(favsRecord);
}

async function getUserFavs(req, res) {
  let id = parseInt(req.params.id);
  const favs = await userCollection.readHasMany(id, favs.model);
  res.status(200).json(favs);
}

module.exports = favRouter;
