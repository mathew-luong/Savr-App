module.exports = app => {
    const expenses = require("../controllers/expenses.controller.js");
    var router = require("express").Router();
    
    router.get("/:userID", expenses.expensesBreakdown);
    
    app.use('/api/expensesBreakdown', router);
  };