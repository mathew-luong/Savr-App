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
    const expenses = []
    req.body.forEach(function(entry, index) { 
    // Create expenses
      const expense = {
        userId: entry.userID,
        name: entry.name,
        category: entry.category,
        date: entry.date,
        amount: entry.amount
      };
      expenses.push(expense)

    });
    Expenses.bulkCreate(expenses)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while creating the expense entry."
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
        const expenses = []
        req.body.forEach(function(entry, index) { 
        // Create expenses
          const expense = {
            userId: entry.userID,
            category: entry.category,
            date: entry.date,
            amount: entry.percentageOfTotalIncome * income
          };
          expenses.push(expense)
    });
    Expenses.bulkCreate(expenses)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the expense entry."
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
    // Validate request
    if (!req.param('userID')) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }
    const userId = req.param('userID');
    const category = None;
    const months = 0
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
    expenseTargets.findAll({
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
      overspending = 0
      expenses.forEach(function(expense,index){
          expense.sum = expense.sum/incomes;
          targets.forEach(function(target,index){
            if (target.category == expense.category){
                if(target.percentage<expense.sum){
                    overspent = -1*(target.percentage - expense.percentage)/target.percentage
                    if (overspending<overspent){
                        underspending = underspent;
                        category = target.category;
                        months = 1
                    }
                }
            }
          })
      })
      const count = 0;
      while(count<12){
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth()-1-count, 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() -count, 0);
        Expenses.sum('amount',{
            where:{
                [Op.and]: {
                userID:userId,
                category:category,
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
            incomes =sum
        })
        overspending = 0
        expenses.forEach(function(expense,index){
            expense.sum = expense.sum/incomes;
            targets.forEach(function(target,index){
              if (target.category == expense.category){
                  if(target.percentage<expense.sum){
                      overspent = -1*(target.percentage - expense.percentage)/target.percentage
                      if (overspending<overspent){
                          underspending = underspent;
                          category = target.category;
                          months += 1;
                      }else{
                          count = 12;
                      }
                  }
              }
            })
        })
        count++;
      }

    res.send({
        category: category,
        numberOfMonths: months
    })
};

exports.expensesBreakdown = (req, res) => {
    // Validate request
    if (!req.param('userID')) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }
    const userId = req.param('userID');
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
        res.send(data)
    })
};

exports.totalExpenses = (req, res) => {
    // Validate request
    if (!req.param('months')||!req.param('userId')) {
        res.status(400).send({
            message: "Did not receive all required information: userID and months!"
        });
        return;
    }
    const userId = req.param('userID');
    const months = req.param('months');
    var monthsNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const results = []
    for (let i = 0; i < months; i++) {
        var firstDay = new Date(date.getFullYear(), date.getMonth()-i, 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth()+1-i , 0);
        Expenses.sum('amount',{
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