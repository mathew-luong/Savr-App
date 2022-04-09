module.exports = app => {
    const savings = require("../controllers/savings.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/deposit",savings.create)
    router.post("/scenarioAnalysis/savings={int}&investments={int2}",savings.scenarioAnalysis)
    router.get("/:userID/months={integer}?", savings.getSavings)
    app.use('/api/savings', router);
  };