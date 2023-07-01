'use strict';

const bookModel = (sequelize, DataTypes) => sequelize.define('bookings', {
  name: { type: DataTypes.STRING, required: true },
  username: { type: DataTypes.STRING, required: true },
  img: { type: DataTypes.STRING, required: true },
  howmany: { type: DataTypes.INTEGER, required: true },
  date: { type: DataTypes.DATE, required: true },
  userId: { type: DataTypes.INTEGER },
});

module.exports = bookModel;