// Expenses targets routes
module.exports = app => {
    const expenseTargets = require("../controllers/expenseTargets.controller.js");
    var router = require("express").Router();
    
    router.post("/", expenseTargets.create);
    router.get("/:userID", expenseTargets.getTargets);

    app.use('/api/expenseTargets', router);
  };