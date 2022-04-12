module.exports = app => {
    const expenses = require("../controllers/expenses.controller.js");
    var router = require("express").Router();
    
    router.get("/:userID/:months", expenses.totalExpenses);
    
    app.use('/api/totalExpenses', router);
  };