// Controller reference: https://www.bezkoder.com/node-js-express-sequelize-mysql/#Create_the_Controller

const db = require("../models");
const Incomes = db.incomes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
        // Validate request    
        req.body.forEach(function(entry, index) {
            if (!entry.userID || !entry.stream || !entry.date || !entry.amount) {
                res.status(400).send({
                    message: "Did not receive all required income information: userID, stream, date and amount!"
                });
                return;
            }
            
        });
        req.body.forEach(function(entry, index) { 
        // Create expense targets
          const income = {
            userId: entry.userID,
            stream: entry.stream,
            date: entry.date,
            amount: entry.amount
          };
          Incomes.create(income)
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

exports.getMonthly = (req, res) => {
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
                results.push({
                    month: monthsNames[date.getMonth()-i],
                    amount: sum
                })
            })
        }
        res.send(results) 
};