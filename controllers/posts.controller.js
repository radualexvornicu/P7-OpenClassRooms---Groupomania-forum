const db = require("../models");
const Posts = db.posts;
const Op = db.Sequelize.Op;
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: posts } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, posts, totalPages, currentPage };
};
// Create and Save a new Posts
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.postcontent) {
    res.status(400).send({
      message: "Posts content can not be empty!"
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

// Retrieve all Posts from the database with Topic Id.
exports.findAll = (req, res) => {
    const topicId = req.params.id;
    console.log("topics id to get posts", topicId);
    const { page, size, postcontent } = req.query;
    var condition = topicId ? { topicId: { [Op.like]: `%${topicId}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    Posts.findAndCountAll({ where: condition , limit, offset, order: [['updatedAt', 'DESC']]  })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
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
