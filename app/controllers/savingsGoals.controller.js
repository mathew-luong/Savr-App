// Controller reference: https://www.bezkoder.com/node-js-express-sequelize-mysql/#Create_the_Controller

const db = require("../models");
const SavingsGoals = db.savingsGoals;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.userID || !req.body.date || !req.body.amount) {
        res.status(400).send({
          message: "Did not receive all required savings goals information: userID, date and amount!"
        });
        return;
      }
      // Create savings goal
      const savingsGoal = {
        userId: req.body.userID,
        date: req.body.date,
        amount: req.body.amount
      };
      SavingsGoals.create(savingsGoal)
            .then(data => {
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the user."
          });
});
}

