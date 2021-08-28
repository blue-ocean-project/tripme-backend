const { DataTypes } = require("sequelize");
const db = require("../index");

const Session = db.define(
  "Session",
  {
    created_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "sessions",
  }
);

module.exports = Session;
