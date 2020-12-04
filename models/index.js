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
/*
//One Categorie can have several Topics
db.categories.belongsToMany(db.topics,{
  through: "cat_topics",
  foreignKey: "categoriesId",
  otherKey: "topicId"
});
//One Topic has one Categorie
db.topics.belongsTo(db.categories,{
    through: "cat_topics",
    foreignKey: "topicId",
    otherKey: "categoriesId"
  });
//One Topic has One User
db.topics.hasOne(db.user,{
  through: "topic_user",
  foreignKey: "topicId",
  otherKey: "userId"
});
//One use can have Many topics
db.user.belongsToMany(db.topics,{
  through: "topic_user",
  foreignKey: "userId",
  otherKey: "topicId"
});
//One Topic can have Many Posts
db.topics.belongsToMany(db.posts,{
  through: "topic_posts",
  foreignKey: "topicId",
  otherKey: "postsId"
});
//One Topic can have Many Posts
db.posts.belongsTo(db.topics,{
  through: "topic_posts",
  foreignKey: "postsId",
  otherKey: "topicId"
});
//One User has many post
db.user.belongsToMany(db.posts,{
  through: "user_posts",
  foreignKey: "userId",
  otherKey: "postsId"
});
*/
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
