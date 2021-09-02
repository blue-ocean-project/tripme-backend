const { DataTypes } = require("sequelize");
const db = require("../index");
const Trips_Users = require("./Trips_Users");

const User = db.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unqiue: true,
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
      defaultValue: "",
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

const Trip = db.define(
  "Trip",
  {
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "trips",
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

const Activity = db.define(
  "Activity",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    description: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
    },
    end_time: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "activities",
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

const Comment = db.define(
  "Comment",
  {
    body: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
  },
  {
    tableName: "comments",
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

const Checklist = db.define(
  "Checklist",
  {
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    item: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
  },
  {
    tableName: "checklists",
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

Comment.belongsTo(User, { foreignKey: "user_id" });
Comment.belongsTo(Activity, { foreignKey: "activity_id" });
Activity.belongsTo(Trip, { foreignKey: "trip_id" });
User.belongsTo(Trips_Users, { foreignKey: "user_id" });
Checklist.belongsTo(Trip, { foreignKey: "trip_id" });

module.exports = { User, Comment, Trip, Activity, Checklist };
