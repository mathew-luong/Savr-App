// Controller reference: https://www.bezkoder.com/node-js-express-sequelize-mysql/#Create_the_Controller

const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new user
// TODO: Retrun generated ID
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      // Create a user
      const user = {
        username: req.body.username,
        password: req.body.password,
        type: req.body.type ? true : false
      };
      // Save User in the database
      Users.create(user)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the user."
          });
        });
};

// Find one user with username
exports.findUsername = (req, res) => {
  
};



// TODO: Future work if we have time, account update
// Update a user by the id in the request
exports.update = (req, res) => {
  
};

// TODO: Future work if we have time, account delete
// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  
};

