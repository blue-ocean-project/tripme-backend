const { DataTypes } = require("sequelize");
const db = require("../index");

const Trips_Activities = db.define(
  "Trips_Activities",
  {
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "trips_activities",
  }
);

module.exports = Trips_Activities;
