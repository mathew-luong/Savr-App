module.exports = app => {
    const investments = require("../controllers/investments.controller.js");
    var router = require("express").Router();
    // Create a new investment
    router.post("/", investments.create);
    router.post("/deposit",investments.create)
    router.get("/:userID/months={integer}?",investments.getInvestments)
    app.use('/api/investments', router);
  };