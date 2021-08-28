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
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = Trips_Activities;
