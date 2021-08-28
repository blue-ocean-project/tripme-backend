const { DataTypes } = require("sequelize");
const db = require("../index");

const Trips_Users = db.define(
  "Trips_Users",
  {
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "trips_users",
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = Trips_Users;
