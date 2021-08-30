const { DataTypes } = require("sequelize");
const db = require("../index");

const Session = db.define(
  "Session",
  {
    session_hash: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "sessions",
    updatedAt: "updated_at",
    createdAt: "created_at",
    indexes: [
      {
        using: "BTREE",
        fields: ["session_hash"],
      },
    ],
  }
);

module.exports = Session;
