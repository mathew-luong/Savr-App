module.exports = app => {
    const incomes = require("../controllers/incomes.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", incomes.create);
 
    app.use('/api/incomes', router);
  };