module.exports = app => {
    const savingsGoals = require("../controllers/savingsGoals.controller.js");
    var router = require("express").Router();
    
    router.post("/", savingsGoals.create);
    
    app.use('/api/savingsGoals', router);
  };