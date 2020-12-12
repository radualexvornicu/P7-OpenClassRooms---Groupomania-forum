const db = require("../models");
const Categories = db.categories;
const Op = db.Sequelize.Op;

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
    const catname = req.query.catname;
    var condition = catname ? { catname: { [Op.like]: `%${catname}%` } } : null;
  
    Categories.findAll({ where: condition })
      .then(data => {
        res.send(data);
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
