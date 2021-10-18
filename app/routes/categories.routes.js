const express = require("express");
const categories = require("../controllers/category.controller.js");
const router = express.Router();

// Create a new Category
router.post("/", categories.create);
  
// Retrieve all categories
router.get("/", categories.findAll);

// Retrieve all published categories
router.get("/published", categories.findAllPublished);

// Retrieve a single Category with id
router.get("/:id", categories.findOne);

// Update a Category with id
router.put("/:id", categories.update);

// Delete a Category with id
router.delete("/:id", categories.delete);

// Create a new Category
router.delete("/", categories.deleteAll);

module.exports = router;

// module.exports = app => {
//     const categories = require("../controllers/category.controller.js");
  
//     var router = require("express").Router();
  
//     // Create a new Category
//     router.post("/", categories.create);
  
//     // Retrieve all categories
//     router.get("/", categories.findAll);
  
//     // Retrieve all published categories
//     router.get("/published", categories.findAllPublished);
  
//     // Retrieve a single Category with id
//     router.get("/:id", categories.findOne);
  
//     // Update a Category with id
//     router.put("/:id", categories.update);
  
//     // Delete a Category with id
//     router.delete("/:id", categories.delete);
  
//     // Create a new Category
//     router.delete("/", categories.deleteAll);
  
//     app.use('/api/category', router);
//   };