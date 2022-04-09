module.exports = app => {
    const savings = require("../controllers/savings.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.get("/:userID", savings.savingsStringStats);
    app.use('/api/savingStringStats', router);
  };