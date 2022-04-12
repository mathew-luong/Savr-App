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
        const incomes = []
        req.body.forEach(function(entry, index) { 
        // Create expense targets
          const income = {
            userId: entry.userID,
            stream: entry.stream,
            date: entry.date,
            amount: entry.amount
          };
          incomes.push(income)
          
    });
    Incomes.bulkCreate(incomes)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the income entry."
        });
    });
};

exports.getMonthly = (req, res) => {
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
    Incomes.findAll({
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