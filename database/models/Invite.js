const { DataTypes } = require("sequelize");
const db = require("../index");

const Invite = db.define(
  "Invite",
  {
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "invites",
  }
);

module.exports = Invite;
