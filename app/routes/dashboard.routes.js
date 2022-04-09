module.exports = app => {
    const topInsights = require("../controllers/topInsights.controller.js");
    const incomes = require("../controllers/incomes.controller.js");

    var router = require("express").Router();

    router.get("/topInsights/:userID", topInsights.getInsights);

    router.get("/income/:userID/months={integer}", incomes.getMonthly);
  
    app.use('/api/dashboard', router);
  };