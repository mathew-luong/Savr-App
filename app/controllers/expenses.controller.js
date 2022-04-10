// Controller reference: https://www.bezkoder.com/node-js-express-sequelize-mysql/#Create_the_Controller

const db = require("../models");
const Expenses = db.expenses;
const Incomes = db.incomes;
const Op = db.Sequelize.Op;

exports.createPrecision = (req, res) => {
    // Validate request    
    req.body.forEach(function(entry, index) {
        if (!entry.userID || !entry.name || !entry.date || !entry.category || !entry.amount) {
            res.status(400).send({
                message: "Did not receive all required expenses information: userID, name, date , category and amount!"
            });
            return;
        }
        
    });
    req.body.forEach(function(entry, index) { 
    // Create expenses
      const expense = {
        userId: entry.userID,
        name: entry.name,
        category: entry.category,
        date: entry.date,
        amount: entry.amount
      };
      Expenses.create(expense)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the expense entry."
    });
    });
});
};

exports.createEstimation = (req, res) => {
        // Validate request    
        req.body.forEach(function(entry, index) {
            if (!entry.userID || !entry.category || !entry.date || !entry.percentageOfTotalIncome) {
                res.status(400).send({
                    message: "Did not receive all required expenses information: userID, category, date and percentage of income!"
                });
                return;
            }
        });

        const userId = req.body[0].userId
        var income;
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth()-1, 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() , 0);
        Incomes.sum('amount',{
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
            income = sum
        })

        req.body.forEach(function(entry, index) { 
        // Create expenses
          const expense = {
            userId: entry.userID,
            category: entry.category,
            date: entry.date,
            amount: entry.percentageOfTotalIncome * income
          };
          Expenses.create(expense)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the expense entry."
        });
        });
    });
};

exports.expensesInsightsChange = (req, res) => {  
    if (!req.param('userID')) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }
    
    const userId = req.param('userID');
    var expensePrev;
    var expenseCurr;
    const date = new Date();
    const firstDayPrev = new Date(date.getFullYear(), date.getMonth()-2, 1);
    const lastDayPrev = new Date(date.getFullYear(), date.getMonth()-1 , 0);
    const firstDayCurr = new Date(date.getFullYear(), date.getMonth()-1, 1);
    const lastDayCurr = new Date(date.getFullYear(), date.getMonth() , 0);
    Expenses.sum('amount',{
        where:{
            [Op.and]: {
            userID:userId,
            date: {
                [Op.gte]:firstDayPrev,
                [Op.lte]:lastDayPrev,
            }
            }
        }
    }).then(sum => {
        expensePrev = sum
    })
    Expenses.sum('amount',{
        where:{
            [Op.and]: {
            userID:userId,
            date: {
                [Op.gte]:firstDayCurr,
                [Op.lte]:lastDayCurr,
            }
            }
        }
    }).then(sum => {
        expenseCurr = sum
    })
    const percentChange = (expenseCurr-expensePrev)/expensePrev
    res.send({
        percentChange: percentChange
    })
};

exports.expenseInsightsOverspent = (req, res) => {
};

exports.expensesBreakdown = (req, res) => {
};

exports.totalExpenses = (req, res) => {
};