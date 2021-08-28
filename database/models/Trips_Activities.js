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
    indexes: [
      {
        using: "BTREE",
        fields: ["trip_id"],
      },
      {
        using: "BTREE",
        fields: ["activity_id"],
      },
    ],
  }
);

module.exports = Trips_Activities;
