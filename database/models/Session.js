const { DataTypes } = require("sequelize");
const db = require("../index");

const Session = db.define(
  "Session",
  {},
  {
    tableName: "sessions",
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = Session;
