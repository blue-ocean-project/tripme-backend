const { DataTypes } = require("sequelize");
const db = require("../index");

const Session = db.define(
  "Session",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
      {
        using: "BTREE",
        fields: ["user_id"],
      },
    ],
  }
);

module.exports = Session;
