const { DataTypes, Sequelize } = require("sequelize");

const {
  database,
  user,
  password,
  host,
  dialect,
} = require("./config/config.database");

const db = new Sequelize(database, user, password, {
  host,
  dialect,
  logging: false,
});

module.exports = db;
