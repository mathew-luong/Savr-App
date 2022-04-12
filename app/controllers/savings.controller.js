// Controller reference: https://www.bezkoder.com/node-js-express-sequelize-mysql/#Create_the_Controller

const db = require("../models");
const Savings = db.savings;
const Investments = db.investments;
const Incomes = db.incomes;
const Expenses = db.expenses;
const ExpenseTargets = db.expenseTargets;
const SavingsGoals = db.savingsGoals;
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize

exports.create = (req, res) => {
    // Validate request
    if (!req.body.userID || !req.body.date || !req.body.amount) {
        res.status(400).send({
            message: "Did not receive all required sign up information: userID, date and amount!"
        });
        return;
        }
        // Create savings object
        const savings = {
            userId: req.body.userID,
            date: req.body.date,
            amount: req.body.amount
        };

        // Create object in db
        Savings.create(savings)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the savings entry."
      });
});
};

exports.getSavings =  (req, res) => {
    // Validate request
    if (!req.params.months||!req.params.userID) {
        res.status(400).send({
            message: "Did not receive all required information: userID and months!"
        });
        return;
    }

    // Required constants for querying and results
    const userId = req.params.userID;
    const months = req.params.months;
    const date = new Date();
    const monthsNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const results = []
    const firstDay = new Date(date.getFullYear(), date.getMonth()-months, 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1 , 0);

    // Get all savings and aggregare results
    Savings.findAll({
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

exports.savingsStats = (req, res) => {
    // Validate request
    if (!req.params.userID) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }

    // Required constants and variables for querying
    const userId = req.params.userID;
    const monthsNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var totalFunds = 0;
    const date = new Date();
    var savingsGoalAmount = 0;
    var savingsGoalDate;
    var averageDepositSavings = 0;
    var averageDepositInvestments = 0;
    var resultsArray = []

    // Query required tables and calculate values
    Savings.sum('amount',{
        where:{
            userId:userId,
        }
    }).then(sum => {
        totalFunds+=sum;
        Investments.sum('amount',{
            where:{
                userId:userId,
            }
        }).then(sum => {
            totalFunds+=sum;
            SavingsGoals.findOne({
                attributes: [
                    sequelize.fn('MIN', sequelize.col('date')),
                    'date',
                    'amount'
                 ],
                 where: {
                     [Op.and]:
                   { 
                    userId:userId,
                    date: {
                        [Op.gte]:date
                    }
                    }
                 }
            }).then(data => {
                if(data){
                    savingsGoalAmount = data.amount;
                    savingsGoalDate = data.date
                }
                var results = 0
                var monthCount = 0
                
                const firstDay = new Date(date.getFullYear(), date.getMonth()-12, 1);
                const lastDay = new Date(date.getFullYear(), date.getMonth()+1 , 0);

                // Get all savings and aggregare results
                Savings.findAll({
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
                        if (!resultsArray[month]){
                            resultsArray[month] = ({
                                month: monthsNames[month],
                                amount: entry.amount
                            })
                        }
                        else{
                            resultsArray[month].amount+=entry.amount
                        }
                    })
                    var cleanResults = resultsArray.filter(element => {
                        return element !== null;
                    });
                    cleanResults.forEach(function(entry,index){
                        results+=entry.amount;
                        monthCount+=1;
                    })

                    averageDepositSavings = results/monthCount;
                    resultsArray = []
                    results = 0
                    monthCount = 0
                    // Get all savings and aggregare results
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
                            if (!resultsArray[month]){
                                resultsArray[month] = ({
                                    month: monthsNames[month],
                                    amount: entry.amount
                                })
                            }
                            else{
                                resultsArray[month].amount+=entry.amount
                            }
                        })
                        var cleanResults = resultsArray.filter(element => {
                            return element !== null;
                        });
                        cleanResults.forEach(function(entry,index){
                            results+=entry.amount;
                            monthCount+=1;
                        })
                    averageDepositInvestments = results/monthCount;
                    res.send(
                        {
                            latestTotalFunds: totalFunds,
                            savingGoals: {
                                savingsGoalsAmount: savingsGoalAmount,
                                savingsGoalDate: savingsGoalDate
                            },
                            averageDepositSavings: averageDepositSavings,
                            averageDepositInvestments: averageDepositInvestments
                        }
                    )
                })
            })
        })

        })
        
    })
    
};

exports.savingsStringStats = (req, res) => {
    // Validate request
    if (!req.params.userID) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }

    // Required constants and variables for querying and aggregating results
    const userId = req.params.userID;
    const category = None;
    const underspending = 0
    var expenses;
    const incomes = 0;
    var targets;
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth()-1, 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() , 0);

    // Query required tables and calculate required values
    Expenses.sum('amount',{
        where:{
            [Op.and]: {
            userID:userId,
            date: {
                [Op.gte]:firstDay,
                [Op.lte]:lastDay,
            }
            }
        },
        
    },{group: 'category'}).then(data => {
        expenses = data
    })
    //get income
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
        incomes +=sum
    })
    //get expense target
    ExpenseTargets.findAll({
        where: {
          userId: userId
        }
      }).then(data => {
          if(data){
            targets = data
        }else{
            res.status(400).send({
                message: "Did not find any expense targets!"
            });
            return;
        }
      })
      
      expenses.forEach(function(expense,index){
          expense.sum = expense.sum/incomes;
          targets.forEach(function(target,index){
            if (target.category == expense.category){
                if(target.percentage>expense.sum){
                    underspent = (target.percentage - expense.percentage)/target.percentage
                    if (underspending<underpent){
                        underspending = underspent;
                        category = target.category;
                    }
                }
            }
          })
      })

    res.send({
        category: category,
        underspending: underspending
    })
};