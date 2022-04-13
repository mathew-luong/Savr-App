// Controller reference: https://www.bezkoder.com/node-js-express-sequelize-mysql/#Create_the_Controller

const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

// Create new user for sign up
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Did not receive all required sign up information: username, password and type!"
    });
    return;
  }
  // Create a user object
  const user = {
    username: req.body.username,
    password: req.body.password,
    type: req.body.type ? true : false
  };

  // Check if user exists
  Users.findOne({
    where: {
      username: req.body.username
    }
  }).then(data => {
    if(data == null){
      // Create user in the database
      Users.create(user)
      .then(data => {
        res.send({
          username: data.username,
          userId: data.id,
          type: data.type
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
    }
    else{
      res.status(400).send({
      message: "Username exists! Try a different username!"
      });
    return;
    }
  })
};

// Find user for login
exports.findUsername = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Did not receive all required login information: username and password!"
    });
    return;
  }
  // Find user in the database
  Users.findOne({
    where: {
      [Op.and]:[
        {username: req.body.username},
        {password: req.body.password}
      ]
    }
  }).then(data => {
      if (data){
        res.send({
            username: data.username,
            userId: data.id,
            type: data.type
        })
      }else{
        res.status(400).send({
          message: "Invalid Login!"
        });
        return;
      }
  })
};