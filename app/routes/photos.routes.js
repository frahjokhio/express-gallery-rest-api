const express = require("express");
const photos = require("../controllers/photo.controller.js");
const router = express.Router();


    // Create a new Photo
    router.post("/", photos.uploadImg, photos.create);

    //Retrieve all photos
    router.get("/", photos.findAll);

    // Retrieve all published photos
    router.get("/published", photos.findAllPublished);

    // Retrieve a single Photo with id
    router.get("/:id", photos.findOne);

    // Update a Photo with id
    router.put("/:id", photos.update);

    // Delete a Photo with id
    router.delete("/:id", photos.delete);

    // Create a new Photo
    router.delete("/", photos.deleteAll);


module.exports = router;



// module.exports = app => {
//     const photos = require("../controllers/photo.controller.js");
//     const multer = require('multer');
//     const upload = multer({'dest' : '/uploads'});
  
//     const router = require("express").Router();
  
//     // Create a new Photo
//     //router.post("/", photos.validate('createPhoto'), photos.create);
//     router.post("/", photos.uploadImg, photos.create);
  
//     // Retrieve all photos
//     router.get("/", photos.findAll);
  
//     // Retrieve all published photos
//     router.get("/published", photos.findAllPublished);
  
//     // Retrieve a single Photo with id
//     router.get("/:id", photos.findOne);
  
//     // Update a Photo with id
//     router.put("/:id", photos.update);
  
//     // Delete a Photo with id
//     router.delete("/:id", photos.delete);
  
//     // Create a new Photo
//     router.delete("/", photos.deleteAll);
  
//     app.use('/api/photos', router);
//   };