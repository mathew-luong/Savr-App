module.exports = app => {
    const savingsGoals = require("../controllers/savingsGoals.controller.js");
    var router = require("express").Router();
    // Create a new savingsGoals
    router.post("/", savingsGoals.create);
    app.use('/api/savingsGoals', router);
  };