"use strict";

const restModel = (sequelize, DataTypes) =>
  sequelize.define("restaurants", {
    name: { type: DataTypes.STRING, defaultValue: "Modern Restaurant" },
    img: {
      type: DataTypes.STRING,
      defaultValue:
        "https://tripandtravelblog.com/wp-content/uploads/2012/12/Q-Restaurant.jpg",
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue:
        "we where culinary excellence meets a warm and inviting atmosphere. Located in the heart of Amman, our restaurant is a haven for food lovers seeking a memorable dining experience. With a commitment to using only the freshest ingredients, our talented chefs craft exquisite dishes that tantalize the taste buds,  each plate is thoughtfully prepared to delight and surprise. Immerse yourself in the stylish and contemporary ambiance which our restaurant has.",
    },
    location: { type: DataTypes.STRING, defaultValue: "Jordan-Amman" },
    rating: { type: DataTypes.FLOAT, defaultValue: "4.5" },
    phone: { type: DataTypes.STRING, defaultValue: "+962 7 8976 4321" },
    email: { type: DataTypes.STRING, defaultValue: "contactus@gmail.com" },
    website: {
      type: DataTypes.STRING,
      defaultValue: "http://www.restwebsite.com",
    },
    ownerId: { type: DataTypes.INTEGER },
  });

module.exports = restModel;
