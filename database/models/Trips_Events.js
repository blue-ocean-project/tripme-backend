const { DataTypes } = require("sequelize");
const db = require("../index");

const Trips_Events = db.define(
  "Trips_Events",
  {
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "trips_events",
  }
);

module.exports = Trips_Events;
