// Controller reference: https://www.bezkoder.com/node-js-express-sequelize-mysql/#Create_the_Controller

// Database objects required to query
const db = require("../models");
const Expenses = db.expenses;
const Incomes = db.incomes;
const expenseTargets = db.expenseTargets;
const sequelize = db.Sequelize;
// Operations objects for queries involving logical and mathematical operations
const Op = db.Sequelize.Op;

// Creates expenses entry with exact data passed for userID
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

    // Create array of expense entries to be created in db
    const expenses = []
    req.body.forEach(function(entry, index) { 
        const expense = {
            userId: entry.userID,
            name: entry.name,
            category: entry.category,
            date: entry.date,
            amount: entry.amount
        };
        expenses.push(expense)
    });

    // Bulk create array entries in DB and return entry results
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

// Creates expenses entry with extimated percentage of income passed for userID
exports.createEstimation = (req, res) => {
    const userId = None;

    // Validate request
    req.body.forEach(function(entry, index) {
        if (!entry.userID || !entry.category || !entry.date || !entry.percentageOfTotalIncome) {
            res.status(400).send({
                message: "Did not receive all required expenses information: userID, category, date and percentage of income!"
            });
            return;
        }
        userId = entry.userID
    });

    // Retrieve latest income for expense amount calculation
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

    // Create array of expense entries to be created in db 
    const expenses = []
    req.body.forEach(function(entry, index) { 
        const expense = {
            userId: entry.userID,
            category: entry.category,
            date: entry.date,
            amount: entry.percentageOfTotalIncome * income
        };
        expenses.push(expense)
    });

// Bulk create array entries in DB and return entry results
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

// Calculates % change in expenses for userId over last two months
exports.expensesInsightsChange = (req, res) => {  
    // Validate request    
    if (!req.param('userID')) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }
    
    // Required constants and variables for query parameters and results
    const userId = req.param('userID');
    var expensePrev;
    var expenseCurr;
    const date = new Date();
    const firstDayPrev = new Date(date.getFullYear(), date.getMonth()-2, 1);
    const lastDayPrev = new Date(date.getFullYear(), date.getMonth()-1 , 0);
    const firstDayCurr = new Date(date.getFullYear(), date.getMonth()-1, 1);
    const lastDayCurr = new Date(date.getFullYear(), date.getMonth() , 0);

    // Get previous month's total expenses
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
        // Get current month's total expenses
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
            // Calculate % change and return result
            const percentChange = (expenseCurr-expensePrev)/expensePrev
            res.send({
                percentChange: percentChange
            })
        })
    })
};

exports.expensesBreakdown = (req, res) => {
    // Validate request
    if (!req.params.userID) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }

    // Required constants for querying
    const userId = req.params.userID;
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth()-1, 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() , 0);

    // Query expenses database
    Expenses.findAll({
        attributes: [
          "category",
          [sequelize.fn("SUM", sequelize.col("amount")), "amount"],
        ],
        where:{
            [Op.and]: {
            userID:userId,
            date: {
                [Op.gte]:firstDay,
                [Op.lte]:lastDay,
            }
            }
        },
        group: "category",
      }).then(data => {
        res.send(data)
    })
};

exports.totalExpenses = (req, res) => {
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

    // Get all expenses and aggregate results
    Expenses.findAll({
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