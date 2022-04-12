module.exports = app => {
    const savings = require("../controllers/savings.controller.js");
    var router = require("express").Router();
    
    router.post("/deposit",savings.create)
    router.get("/:userID/:months", savings.getSavings)
    
    app.use('/api/savings', router);
  };