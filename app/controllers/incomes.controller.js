// Controller reference: https://www.bezkoder.com/node-js-express-sequelize-mysql/#Create_the_Controller

const db = require("../models");
const incomes = db.incomes;
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
          incomes.create(income)
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
};

