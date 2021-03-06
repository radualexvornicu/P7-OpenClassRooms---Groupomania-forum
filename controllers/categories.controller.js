const db = require("../models");
const Categories = db.categories;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: categories } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, categories, totalPages, currentPage };
};
// Create and Save a new Categori
exports.create = (req, res) => {
  // Validate request
  if (!req.body.catname) {
    res.status(400).send({
      message: "Categorie name can not be empty!"
    });
    return;
  }
  // Create a Categorie
  const categories = {
    catname: req.body.catname,
    catdescription: req.body.catdescription,
    userId: req.body.userId
  };
  // Save Categorie in the database
  Categories.create(categories).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Categorie."
    });
  });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
  const { page, size, catname } = req.query;
    var condition = catname ? { catname: { [Op.like]: `%${catname}%` } } : null;
    const { limit, offset } = getPagination(page, size);

    Categories.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
      });
};

// Find a single Categorie with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Categories.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Categories with id=" + id
        });
      });
};

// Update a Categorie by the id in the request
exports.update = (req, res) => {
  
    const id = req.params.id;
console.log(id);
console.log(req.body);
    Categories.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Categorie was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Categorie with id=${id}. Maybe Categorie was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Categorie with id=" + id
        });
      });
};

// Delete a Categorie with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Categories.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Categorie was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Categorie with id=${id}. Maybe Categorie was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Categorie with id=" + id
        });
      });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    Categories.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Categories were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Categories."
          });
        });
};
