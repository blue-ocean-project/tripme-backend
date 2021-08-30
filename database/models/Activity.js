const { DataTypes, Sequelize } = require("sequelize");
const db = require("../index");

const Activity = db.define(
  "Activity",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "activities",
    indexes: [
      {
        using: "BTREE",
        fields: ["trip_id"],
      },
    ],
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = Activity;
