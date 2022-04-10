// Controller reference: https://www.bezkoder.com/node-js-express-sequelize-mysql/#Create_the_Controller

const db = require("../models");
const Investments = db.investments;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
   // Validate request
   if (!req.body.userID || !req.body.portfolioValueAtEndOfMonth || !req.body.amount) {
    res.status(400).send({
        message: "Did not receive all required sign up information: userID, portfolio value and amount!"
    });
    return;
    }
    // Create savings
    const investments = {
        userId: req.body.userID,
        date: new DATE(),
        amount: req.body.amount,
        portfolioAmount: req.body.portfolioValueAtEndOfMonth
    };
    Investments.create(investments)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the investments entry."
  });
});
};

exports.getInvestments = (req, res) => {
    // Validate request
    if (!req.param('userId')) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }
    const userId = req.param('userID');
    const months = req.param('months')?req.param('months'):1
    var monthsNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const results = []
    for (let i = 0; i < months; i++) {
        var firstDay = new Date(date.getFullYear(), date.getMonth()-i, 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth()+1-i , 0);
        Investments.sum('amount',{
            where:{
                [Op.and]: {
                userID:userId,
                date: {
                    [Op.gte]:firstDay,
                    [Op.lte]:lastDay,
                }
                }
            }
        }).then(sum => {
            results.push({
                month: monthsNames[date.getMonth()-i],
                amount: sum
            })
        })
    }
    res.send(results) 
};