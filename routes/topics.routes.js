module.exports = app => {
    const topics = require("../controllers/topics.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Topic
    router.post("/", topics.create);
  
    // Retrieve all Topics
    router.get("/catid/:id", topics.findAll);
  
    // Retrieve a single Topic with id
    router.get("/:id",  topics.findOne);
  
    // Update a Topic with id
    router.put("/:id",  topics.update);
  
    // Delete a Topic with id
    router.delete("/:id", topics.delete);
  
    // Delete all Topics
    router.delete("/", topics.deleteAll);
  
    app.use('/api/topics', router);
  };