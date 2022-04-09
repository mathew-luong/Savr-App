module.exports = app => {
    const expenses = require("../controllers/expenses.controller.js");
    var router = require("express").Router();
    // Create a new precision expense entry
    router.post("/precision", expenses.createPrecision);
    // Create a new estimation expense entry
    router.post("/estimation", expenses.createEstimation);
    // Create a new estimation expense entry
    router.get("/:userID/expenseInsightsChange", expenses.expensesInsightsChange);
    // Create a new estimation expense entry
    router.get("/:userID/expenseInsightsOverspent", expenses.expensesInsightsChange);

    app.use('/api/expenses', router);
  };