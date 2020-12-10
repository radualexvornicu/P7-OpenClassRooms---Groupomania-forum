const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const mysql = require('mysql2/promise');

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.categories = require("../models/categories.model.js")(sequelize, Sequelize);
db.topics = require("../models/topics.model.js")(sequelize, Sequelize);
db.posts = require("../models/posts.model.js")(sequelize, Sequelize);
//One Role can be taken on by many Users
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
//One User can have several Roles
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// Topics - Categories asociasion !!!
//One Topics belongs to one Categories
db.topics.belongsTo(db.categories, {
  foreignKey: "categorieId",
  as: "categorie",
});
//One Categorie has Many Topics
db.categories.hasMany(db.topics, { as: "topics" });

// User - Topics asociasion !!!
//One Topics  has one User
db.topics.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});
//One User can have Many Topics
db.user.hasMany(db.topics, { as: "topic"});

// User - Posts asociasion !!!
//One Post belongs to one User
db.posts.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});
//One User has Many Posts
db.user.hasMany(db.posts, {as: "post"});

// User - Categories asociasion !!!
//One Categoni has one User
db.categories.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});
//One User has many Categories
db.user.hasMany(db.categories, {as: "categorie"});

// Topics - Posts asociasion !!!
//One Posts has one Topics
db.posts.belongsTo(db.topics, {
  foreignKey: "topicId",
  as: "topic",
});
//One Topics has many Posts
db.topics.hasMany(db.posts, {as: "post" });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
