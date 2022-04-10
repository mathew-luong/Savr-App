// Controller reference: https://www.bezkoder.com/node-js-express-sequelize-mysql/#Create_the_Controller

const db = require("../models");
const expenseTargets = db.expenseTargets;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request    
    req.body.forEach(function(entry, index) {
        if (!entry.userID || !entry.category || !entry.percentageOfTotalIncome) {
            res.status(400).send({
                message: "Did not receive all required expense targets information: userID, category and percentageOfTotalIncome!"
            });
            return;
        }
        
    });
    req.body.forEach(function(entry, index) { 
    // Create expense targets
      const expenseTarget = {
        userId: entry.userID,
        category: entry.category,
        percentage: entry.percentageOfTotalIncome
      };
      expenseTargets.create(expenseTarget)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
    });
    });
});
};

exports.getTargets = (req, res) => {
    // Validate request
    if (!req.param('userID')) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }
    const userId = req.param('userID');
    expenseTargets.findOne({
        where: {
          userId: userId
        }
      }).then(data => {
          if(data){
          res.send(data)
        }else{
            res.status(400).send({
                message: "Did not find any expense targets!"
            });
            return;
        }
      })
};
