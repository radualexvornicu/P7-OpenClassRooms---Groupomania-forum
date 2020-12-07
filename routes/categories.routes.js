module.exports = app => {
    const categories = require("../controllers/categories.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Categorie
    router.post("/", categories.create);
  
    // Retrieve all Categories
    router.get("/", categories.findAll);
  
    // Retrieve a single Categorie with id
    router.get("/:id", categories.findOne);
  
    // Update a Categorie with id
    router.put("/:id", categories.update);
  
    // Delete a Categorie with id
    router.delete("/:id", categories.delete);
  
    // Delete all Categories
    router.delete("/", categories.deleteAll);
  
    app.use('/api/categories', router);
  };