const { DataTypes } = require("sequelize");
const db = require("../index");

const Trip = db.define(
  "Trip",
  {
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "trips",
  }
);

module.exports = Trip;
