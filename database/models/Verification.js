const { DataTypes } = require("sequelize");
const db = require("../index");

const Verification = db.define(
  "Verification",
  {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "verifications",
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = Verification;
