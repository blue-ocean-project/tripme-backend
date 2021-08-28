const { DataTypes } = require("sequelize");
const db = require("../index");

const Comment = db.define(
  "Comment",
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "comments",
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = Comment;
