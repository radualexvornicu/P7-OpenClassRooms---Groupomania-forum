const db = require("../models");
const Posts = db.posts;
const Op = db.Sequelize.Op;

// Create and Save a new Posts
exports.create = (req, res) => {
  // Validate request
  if (!req.body.postcontent) {
    res.status(400).send({
      message: "Posts subject can not be empty!"
    });
    return;
  }
  // Create a Posts
  const posts = {
    postcontent: req.body.postcontent,
    topicId: req.body.topicId,
    userId: req.body.userId
  };
  // Save Post in the database
  Posts.create(posts).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Post."
    });
  });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
    const postcontent = req.query.postcontent;
    var condition = postcontent ? { postcontent: { [Op.like]: `%${postcontent}%` } } : null;
  
    Posts.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving post."
        });
      });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Posts.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving post with id=" + id
        });
      });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Posts.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Post was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Post with id=${id}. Maybe post was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Post with id=" + id
        });
      });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Posts.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Post was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Posts with id=${id}. Maybe Post was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Post with id=" + id
        });
      });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
    Posts.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Post were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Posts."
          });
        });
};
