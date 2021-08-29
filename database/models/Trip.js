const { DataTypes, Sequelize } = require("sequelize");
const db = require("../index");

const Trip = db.define(
  "Trip",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
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
    tableName: "trips",
  }
);

module.exports = Trip;
