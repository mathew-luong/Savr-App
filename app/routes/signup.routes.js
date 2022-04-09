module.exports = app => {
    const users = require("../controllers/users.controller.js");
    var router = require("express").Router();
    // Create a new user
    router.post("/", users.create);
    app.use('/api/signup', router);
  };