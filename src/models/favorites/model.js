"use strict";

const favModel = (sequelize, DataTypes) =>
  sequelize.define("favs", {
    name: { type: DataTypes.STRING, required: true },
    img: { type: DataTypes.STRING, required: true },
    description: { type: DataTypes.TEXT, required: true },
    location: { type: DataTypes.STRING, required: true },
    rating: { type: DataTypes.FLOAT, required: true },
    price: { type: DataTypes.STRING, required: true },
    userId: { type: DataTypes.INTEGER },
  });

module.exports = favModel;
