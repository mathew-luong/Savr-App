const db = require("../models");
const Savings = db.savings;
const Investments = db.investments;
const Incomes = db.incomes;
const Expenses = db.expenses;
const Op = db.Sequelize.Op;


exports.getInsights = (req, res) => {
    // Validate request
    if (!req.query['userID']) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }
    const userId = req.query['userID']
    const totalFundsPrev = 0;
    const totalFundsCurr = 0;
    const incomesPrev = 0;
    const incomesCurr = 0;
    const expensesPrev = 0;
    const expensesCurr = 0;
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
        totalFundsPrev = sum;
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
            totalFundsPrev+=sum
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
                totalFundsCurr = sum
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
                    totalFundsCurr += sum
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
                        incomesPrev = sum
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
                            incomesCurr = sum
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
                                expensesPrev = sum
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
                                    expensesCurr = sum
                                    res.send({
                                        totalFunds: [totalFundsPrev,totalFundsCurr],
                                        income: [incomesPrev,incomesCurr],
                                        expenses: [expensesPrev,expensesCurr]
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })    
};
