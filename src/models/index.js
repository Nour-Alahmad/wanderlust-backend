"use strict";

const userModel = require("../auth/models/users.js");
const { Sequelize, DataTypes } = require("sequelize");
const restModel = require("./Restaurants/model.js");
const favsModel = require("./favorites/model.js");
const hotelModel = require("./Hotel/model.js");
const bookingModel = require("./userBookings/model.js");
const Collection = require("./data-collection.js");

const DATABASE_URL = process.env.DATABASE_URL || "sqlite:memory;";

const sequelize = new Sequelize(DATABASE_URL);
const user = userModel(sequelize, DataTypes);
const restaurant = restModel(sequelize, DataTypes);
const favs = favsModel(sequelize, DataTypes);
const hotel = hotelModel(sequelize, DataTypes);
const booking = bookingModel(sequelize, DataTypes);

const restaurantCollection = new Collection(restaurant);
const favsCollection = new Collection(favs);
const hotelCollection = new Collection(hotel);
const bookingCollection = new Collection(booking);
const userCollection = new Collection(user);

user.hasMany(favs, {
  foreignKey: "userId",
  sourceKey: "id",
});
favs.belongsTo(user, {
  foreignKey: "userId",
  targetKey: "id",
});

user.hasMany(booking, {
  foreignKey: "userId",
  sourceKey: "id",
});
booking.belongsTo(user, {
  foreignKey: "userId",
  targetKey: "id",
});

user.hasMany(restaurant, {
  foreignKey: "ownerId",
  sourceKey: "id",
});
restaurant.belongsTo(user, {
  foreignKey: "ownerId",
  targetKey: "id",
});

user.hasMany(hotel, {
  foreignKey: "ownerId",
  sourceKey: "id",
});
hotel.belongsTo(user, {
  foreignKey: "ownerId",
  targetKey: "id",
});

module.exports = {
  db: sequelize,
  userCollection: userCollection,
  users: user,
  restaurant: restaurantCollection,
  favs: favsCollection,
  hotel: hotelCollection,
  booking: bookingCollection,
};
