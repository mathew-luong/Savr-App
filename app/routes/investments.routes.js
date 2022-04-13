// Investment routes
module.exports = app => {
    const investments = require("../controllers/investments.controller.js");
    var router = require("express").Router();
    
    router.post("/", investments.create);
    router.post("/deposit",investments.create)
    router.get("/:userID/:months",investments.getInvestments)
    
    app.use('/api/investments', router);
  };