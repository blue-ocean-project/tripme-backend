const { DataTypes, Sequelize } = require("sequelize");
const db = require("../index");

const Comment = db.define(
  "Comment",
  {
    body: {
      type: DataTypes.STRING(1234),
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
    indexes: [
      {
        using: "BTREE",
        fields: ["activity_id"],
      },
      {
        using: "BTREE",
        fields: ["user_id"],
      },
    ],
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = Comment;
