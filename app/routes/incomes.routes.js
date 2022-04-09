module.exports = app => {
    const incomes = require("../controllers/incomes.controller.js");
    var router = require("express").Router();
    
    router.post("/", incomes.create);
 
    app.use('/api/incomes', router);
  };