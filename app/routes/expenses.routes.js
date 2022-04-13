// Expenses routes
module.exports = app => {
    const expenses = require("../controllers/expenses.controller.js");
    var router = require("express").Router();

    router.post("/precision", expenses.createPrecision);
    router.post("/estimation", expenses.createEstimation);
    router.get("/:userID/expenseInsightsChange", expenses.expensesInsightsChange);

    app.use('/api/expenses', router);
  };