module.exports = app => {
    const photos = require("../controllers/photo.controller.js");
    const multer = require('multer');
    const upload = multer({'dest' : '/uploads'});
  
    const router = require("express").Router();
  
    // Create a new Tutorial
    //router.post("/", photos.validate('createPhoto'), photos.create);
    router.post("/", photos.uploadImg, photos.create);
  
    // Retrieve all photos
    router.get("/", photos.findAll);
  
    // Retrieve all published photos
    router.get("/published", photos.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", photos.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", photos.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", photos.delete);
  
    // Create a new Tutorial
    router.delete("/", photos.deleteAll);
  
    app.use('/api/photos', router);
  };