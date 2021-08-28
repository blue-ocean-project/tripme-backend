const { DataTypes } = require("sequelize");
const db = require("../index");

const Invite = db.define(
  "Invite",
  {
    trip_id: {
      type: DataTypes.INTEGER,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "invites",
    updatedAt: "updated_at",
    createdAt: "created_at",
    indexes: [
      {
        using: "BTREE",
        fields: ["trip_id"],
      },
    ],
  }
);

module.exports = Invite;
