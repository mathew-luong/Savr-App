module.exports = app => {
    const users = require("../controllers/users.controller.js");
    var router = require("express").Router();
    // Retrieve user
    router.get("/", users.findUsername);
    app.use('/api/login', router);
  };