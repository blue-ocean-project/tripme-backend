const { DataTypes, Sequelize } = require("sequelize");
const db = require("../index");

const Activity = db.define(
  "Activity",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
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
    createdAt: {
      field: "created_at",
      type: Sequelize.DATE,
    },
    updatedAt: {
      field: "updated_at",
      type: Sequelize.DATE,
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
  }
);

module.exports = Activity;
