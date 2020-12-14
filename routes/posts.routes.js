module.exports = app => {
    const posts = require("../controllers/posts.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Post
    router.post("/", posts.create);
  
    // Retrieve all Posts
    router.get("/topid/:id",  posts.findAll);
  
    // Retrieve a single Post with id
    router.get("/:id",  posts.findOne);
  
    // Update a Post with id
    router.put("/:id",  posts.update);
  
    // Delete a Post with id
    router.delete("/:id", posts.delete);
  
    // Delete all Posts
    router.delete("/", posts.deleteAll);
  
    app.use('/api/posts', router);
  };