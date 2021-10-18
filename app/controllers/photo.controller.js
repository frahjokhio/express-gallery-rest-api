//const db = require("../models");
const Photo = require("../models/photo.model");
const Category = require("../models/category.model");
const Joi = require('joi');
const { createPhotoVal }  = require("../validation/photo.validation");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads');
    },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

exports.uploadImg = multer({storage: storage}).single('image');

const getPagination = (page, limit) => {
  
  const setLimit = limit ? limit : 10;
  const setPage = page ? page : 1;

  return { setLimit, setPage };
};

// Create and Save a new Photo
exports.create = async (req, res, next) => {

  
  //console.log( req.body );
  try {
    req.body.image = req.file.path;
    const { error } = createPhotoVal(req.body);
    
    if(error) return res.send({ "error" : error.details[0].message });

    const photoExists = await Photo.findOne({title: req.body.title});
    if( photoExists ) return res.status(400).send({ "error" : "Photo with this title already exists." });

    Category.findOne({ _id : req.body.category }, function (err, cat) {
      
        if(err) return res.send({ "error" : err });

        // Create a Photo
        const photo = new Photo(req.body);

        // Save Photo in the database
        photo.save(function(err, photo) {
            Photo
            .populate(photo, { path: 'category', select: 'name' })
            .then(data => {
              const port = process.env.PORT || 8080;
              data.image = `http://localhost:${port}/${data.image}`
              console.log(data.image);
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Photo."
              });
            });
        });
    });
    
  } catch(err) {
    return next(err)
  }

};

// Retrieve all Photos from the database.
exports.findAll = (req, res) => {
  
  const { page, limit, title } = req.query;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};


  const { setLimit, setPage } = getPagination( page, limit );
  
  const abc = ({ path: 'category', select: 'name status' });
  
  const options = {
    select: '_id title description category',
    populate: abc,
    //lean: true,
    page: parseInt(setPage), 
    limit: parseInt(setLimit),
    //pagination: false,
  };

  Photo.paginate(condition, options)
    .then((data) => {
      res.send({
        data: data.docs,
        totalPages: data.pages,
        totalItems: data.total,
        currentPage: data.page,
        showing: data.limit,
        previousPage: data.page - 1,
        nextPage: data.page + 1

      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categorys.",
      });
    });
};

// Find a single Photo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Photo.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Photo with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Photo with id=" + id });
    });
};

// Update a Photo by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Photo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      console.log(data);
      if (!data) {
        res.status(404).send({
          message: `Cannot update Photo with id=${id}. Maybe Photo was not found!`
        });
      } else res.send({ message: "Photo was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Photo with id=" + id
      });
    });
};

// Delete a Photo with the specified id in the request
exports.delete = (req, res) => {
  
  const id = req.params.id;

  Photo.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Photo with id=${id}. Maybe Photo was not found!`
        });
      } else {
        res.send({
          message: "Photo was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Photo with id=" + id
      });
    });
};

// Delete all Photos from the database.
exports.deleteAll = (req, res) => {
  Photo.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Photos were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Photos."
      });
    });
};

// Find all published Photos
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Photo.paginate({ published: true }, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        Photos: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Photos.",
      });
    });
};