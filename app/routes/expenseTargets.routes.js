module.exports = app => {
    const expenseTargets = require("../controllers/expenseTargets.controller.js");
    var router = require("express").Router();
    // Create a new expense target
    router.post("/", expenseTargets.create);

    // Create a new expense target
    router.get("/:userID?", expenseTargets.getTargets);

    app.use('/api/expenseTargets', router);
  };