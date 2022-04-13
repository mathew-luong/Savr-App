// Login routes
module.exports = app => {
    const users = require("../controllers/users.controller.js");
    var router = require("express").Router();
    
    router.post("/", users.findUsername);
    
    app.use('/api/login', router);
  };