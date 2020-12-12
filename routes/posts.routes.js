module.exports = app => {
    const posts = require("../controllers/posts.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Categorie
    router.post("/", posts.create);
  
    // Retrieve all Categories
    router.get("/",  posts.findAll);
  
    // Retrieve a single Categorie with id
    router.get("/:id",  posts.findOne);
  
    // Update a Categorie with id
    router.put("/:id",  posts.update);
  
    // Delete a Categorie with id
    router.delete("/:id", posts.delete);
  
    // Delete all Categories
    router.delete("/", posts.deleteAll);
  
    app.use('/api/posts', router);
  };