
const Category = require("../models/category.model");
const { createCategoryVal }  = require("../validation/category.validation");

const getPagination = (page, limit) => {
  
  const setLimit = limit ? limit : 10;
  const setPage = page ? page : 1;

  return { setLimit, setPage };
};

// Create and Save a new Category
exports.create = async (req, res) => {
  
    try {

        const { error } = createCategoryVal(req.body);
        if(error) return res.send({ "error" : error.details[0].message });

        const categoryExists = await Category.findOne({name: req.body.name});
        if( categoryExists ) return res.status(400).send({ "error" : "Category with this name already exists." });

          // Create a category
          const category = new Category(req.body);

          // Save category in the database
          category.save(category).then( data => {
            res.send(data);
          }).catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the category."
            });
          });

      } catch(err) {
        return next(err)
      }
};

// Retrieve all Categorys from the database.
exports.findAll = (req, res) => {
  const { page, limit, name } = req.query;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};
    
    const { setLimit, setPage } = getPagination( page, limit );
    const options = {
      select: 'name status',
      //lean: false,
      page: parseInt(setPage), 
      limit: parseInt(setLimit)
    };
  
  Category.paginate(condition, options)
    .then((data) => {
      console.log(data)
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

// Find a single Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Category with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Category with id=" + id });
    });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found!`
        });
      } else res.send({ message: "Category was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category with id=" + id
      });
    });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      } else {
        res.send({
          message: "Category was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
};

// Delete all Categorys from the database.
exports.deleteAll = (req, res) => {
  Category.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Categorys were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Categorys."
      });
    });
};

// Find all published Categorys
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Category.paginate({ published: true }, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        Categorys: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categorys.",
      });
    });
};