const db = require("../models");
const Savings = db.savings;
const Investments = db.investments;
const Incomes = db.incomes;
const Expenses = db.expenses;
const Op = db.Sequelize.Op;


exports.getInsights = (req, res) => {
    // Validate request
    if (!req.param('userID')) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }
    const userId = req.param('userID');
    const totalFunds = []
    const incomes = []
    const expenses = []

    const date = new Date();
    const firstDayPrev = new Date(date.getFullYear(), date.getMonth()-2, 1);
    const lastDayPrev = new Date(date.getFullYear(), date.getMonth()-1 , 0);
    const firstDayCurr = new Date(date.getFullYear(), date.getMonth()-1, 1);
    const lastDayCurr = new Date(date.getFullYear(), date.getMonth() , 0);
    
    Savings.sum('amount',{
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
        totalFunds.push(sum)
    })
    Investments.sum('amount',{
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
        totalFunds[0]+=sum;
    })
    Savings.sum('amount',{
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
        totalFunds.push(sum)
    })
    Investments.sum('amount',{
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
        totalFunds[1]+=sum;
    })
    Incomes.sum('amount',{
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
        incomes.push(sum)
    })
    Incomes.sum('amount',{
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
        incomes.push(sum)
    })
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
        expenses.push(sum)
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
        expenses.push(sum)
    })
    res.send({
        totalFunds: totalFunds,
        income: incomes,
        expenses: expenses
    })
};
