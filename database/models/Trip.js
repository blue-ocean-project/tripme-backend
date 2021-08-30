const { DataTypes, Sequelize } = require("sequelize");
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
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = Trip;
