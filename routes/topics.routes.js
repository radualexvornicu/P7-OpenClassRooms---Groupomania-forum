module.exports = app => {
    const topics = require("../controllers/topics.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Categorie
    router.post("/", topics.create);
  
    // Retrieve all Categories
    router.get("/",  topics.findAll);
  
    // Retrieve a single Categorie with id
    router.get("/:id",  topics.findOne);
  
    // Update a Categorie with id
    router.put("/:id",  topics.update);
  
    // Delete a Categorie with id
    router.delete("/:id", topics.delete);
  
    // Delete all Categories
    router.delete("/", topics.deleteAll);
  
    app.use('/api/topics', router);
  };