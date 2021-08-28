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
    indexes: [
      {
        using: "BTREE",
        fields: ["trip_id"],
      },
      {
        using: "BTREE",
        fields: ["user_id"],
      },
    ],
  }
);

module.exports = Trips_Users;
