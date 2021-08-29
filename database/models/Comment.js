const { DataTypes, Sequelize } = require("sequelize");
const db = require("../index");

const Comment = db.define(
  "Comment",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
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
  }
);

module.exports = Comment;
