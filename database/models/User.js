const { DataTypes } = require("sequelize");
const db = require("../index");

const User = db.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unqiue: true,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
      unqiue: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    tableName: "users",
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = User;
