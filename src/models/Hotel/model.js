"use strict";

const hotelModel = (sequelize, DataTypes) =>
  sequelize.define("hotels", {
    name: { type: DataTypes.STRING, defaultValue: "Modern Hotel" },
    img: {
      type: DataTypes.STRING,
      defaultValue:
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue:
        "Discover a world of luxury and elegance with us. Nestled in the heart of Amman, our hotel offers an unparalleled experience that combines impeccable service with exquisite accommodations. Step into a realm of refined comfort as our attentive staff greets you with a warm smile and ensures every aspect of your stay is seamless. Indulge in our beautifully appointed rooms and suites, designed to provide a haven of tranquility and relaxation. From plush furnishings to modern amenities, every detail has been carefully curated to exceed your expectations.",
    },
    location: { type: DataTypes.STRING, defaultValue: "Jordan-Amman" },
    rating: { type: DataTypes.FLOAT, defaultValue: "5.0" },
    phone: { type: DataTypes.STRING, defaultValue: "+962 7 8976 4321" },
    email: { type: DataTypes.STRING, defaultValue: "contactus@gmail.com" },
    price: { type: DataTypes.STRING, defaultValue: "$120 - $150" },
    ownerId: { type: DataTypes.INTEGER },
  });

module.exports = hotelModel;
