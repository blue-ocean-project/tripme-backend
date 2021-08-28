const { DataTypes } = require("sequelize");
const db = require("../index");

const Comment = db.define(
  "Comment",
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "comments",
  }
);

module.exports = Comment;
