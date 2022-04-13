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
        date: new Date(),
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
    if (!req.params.userID) {
        res.status(400).send({
            message: "Did not receive all required information: userID and months!"
        });
        return;
    }

    // Required constants for querying and results
    const userId = req.params.userID;
    const months = req.params.months?req.params.months:1;
    const date = new Date();
    const monthsNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const results = []
    const firstDay = new Date(date.getFullYear(), date.getMonth()-months, 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1 , 0);

    // Get all investments and aggregate results
    Investments.findAll({
        where:{
            [Op.and]: {
            userId:userId,
            date: {
                [Op.gte]:firstDay,
                [Op.lte]:lastDay,
            }
            }
        }
    }).then(data => {
        data.forEach(function(entry,index){
            var month = entry.date.getMonth()
            if (!results[month]){
                results[month] = ({
                    month: monthsNames[month],
                    amount: entry.amount
                })
            }
            else{
                results[month].amount+=entry.amount
            }
        })
        const cleanResults = results.filter(element => {
            return element !== null;
          });
        res.send(cleanResults) 
    })

};