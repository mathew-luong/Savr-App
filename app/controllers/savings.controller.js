// Controller reference: https://www.bezkoder.com/node-js-express-sequelize-mysql/#Create_the_Controller

const db = require("../models");
const Savings = db.savings;
const Investments = db.investments;
const Incomes = db.incomes;
const Expenses = db.expenses;
const ExpenseTargets = db.expenseTargets;
const SavingsGoals = db.savingsGoals;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.userID || !req.body.date || !req.body.amount) {
        res.status(400).send({
            message: "Did not receive all required sign up information: userID, date and amount!"
        });
        return;
        }
        // Create savings
        const savings = {
            userId: req.body.userID,
            date: req.body.date,
            amount: req.body.amount
        };
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

exports.scenarioAnalysis = (req, res) => {
    // Validate request
    if (!req.param('userID')||!req.param('savings')||!req.param('investments')) {
        res.status(400).send({
            message: "Did not receive all required information: userID, savings and investments!"
        });
        return;
    }
    const userId = req.param('userID');
    const savings = req.param('savings');
    const investments = req.param('investments');

    // TODO: Use formula, currently returning placeholders
    res.send({
        annual: 5,
        monthly: 0.4,
        probability: "likely"
    })
};

exports.getSavings = (req, res) => {
    // Validate request
    if (!req.param('months')||!req.param('userId')) {
        res.status(400).send({
            message: "Did not receive all required information: userID and months!"
        });
        return;
    }
    const userId = req.param('userID');
    const months = req.param('months');
    const date = new Date();
    var monthsNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const results = []
    for (let i = 0; i < months; i++) {
        var firstDay = new Date(date.getFullYear(), date.getMonth()-i, 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth()+1-i , 0);
        Savings.sum('amount',{
            where:{
                [Op.and]: {
                userId:userId,
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

exports.savingsStats = (req, res) => {
    // Validate request
    if (!req.param('userID')) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }
    const userId = req.param('userID');
    const totalFunds = 0;
    const date = new Date();
    const savingsGoalAmount = 0;
    const savingsGoalDate = None;
    const averageDepositSavings = 0;
    const averageDepositInvestments = 0;
    Savings.sum('amount',{
        where:{
            userId:userId,
        }
    }).then(sum => {
        totalFunds+=sum;
    })
    Investments.sum('amount',{
        where:{
            userId:userId,
        }
    }).then(sum => {
        totalFunds+=sum;
    })
    SavingsGoals.findOne({
        attributes: [
            sequelize.fn('MIN', sequelize.col('date'))
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
    })
    const results = 0
    const monthCount = 0
    for (let i = 0; i < 12; i++) {
        var firstDay = new Date(date.getFullYear(), date.getMonth()-i, 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth()+1-i , 0);
        Savings.sum('amount',{
            where:{
                [Op.and]: {
                userId:userId,
                date: {
                    [Op.gte]:firstDay,
                    [Op.lte]:lastDay,
                }
                }
            }
        }).then(sum => {
            results+=sum;
            monthCount+=1;
        }).catch(err => {
        });
    };
    averageDepositSavings = results/monthCount;
    results = 0
    monthCount = 0
    for (let i = 0; i < 12; i++) {
        var firstDay = new Date(date.getFullYear(), date.getMonth()-i, 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth()+1-i , 0);
        Investments.sum('amount',{
            where:{
                [Op.and]: {
                userId:userId,
                date: {
                    [Op.gte]:firstDay,
                    [Op.lte]:lastDay,
                }
                }
            }
        }).then(sum => {
            results+=sum;
            monthCount+=1;
        }).catch(err => {
        });
    };
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
};

exports.savingsStringStats = (req, res) => {
    // Validate request
    if (!req.param('userID')) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }
    const userId = req.param('userID');
    const category = None;
    const underspending = 0
    //get expenses
    var expenses;
    const incomes = 0;
    var targets;
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth()-1, 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() , 0);
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