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

// User - Categories asociasion !!!

//One User can have Many categories
db.user.belongsToMany(db.categories,{
  through: "user_cat",
  foreignKey: "userId",
  otherKey: "categoriesId"
});
//One Categorie has one User
db.categories.belongsTo(db.user,{
    through: "user_cat",
    foreignKey: "categoriesId",
    otherKey: "userId"
  });
// User - Topics asociasion !!!
//One User can have Many Topics
db.user.belongsToMany(db.topics,{
  through: "user_topics",
  foreignKey: "userId",
  otherKey: "topicsId"
});
//One Topics  has one User
db.topics.belongsTo(db.user,{
  through: "user_topics",
  foreignKey: "topicsId",
  otherKey: "userId"
});
// User - Posts asociasion !!!
//One Topic can have Many Posts
db.user.belongsToMany(db.posts,{
  through: "user_posts",
  foreignKey: "userId",
  otherKey: "postsId"
});
//One Topic can have Many Posts
db.posts.belongsTo(db.user,{
  through: "user_posts",
  foreignKey: "postsId",
  otherKey: "userId"
});
// Topics - Categories asociasion !!!
//One Topics has one categorie
db.topics.belongsTo(db.categories,{
  through: "topics_cat",
  foreignKey: "topicsId",
  otherKey: "categoriesId"
});
//One Categories has many topisc
db.categories.belongsToMany(db.topics, {
  through: "topics_cat",
  foreignKey: "categoriesIs",
  otherKey: "topicsId"
});
// Topics - Posts asociasion !!!
//One Topics has many Posts
db.topics.belongsToMany(db.posts, {
  through: "topics_posts",
  foreignKey: "topicsId",
  otherKey: "postsId"
});
//One Posts has one Topics
db.posts.belongsToMany(db.topics, {
  through: "topics_posts",
  foreignKey: "postsId",
  otherKey: "topicsId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
