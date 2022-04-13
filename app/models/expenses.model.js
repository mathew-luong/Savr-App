// Expenses table model
module.exports = (sequelize, Sequelize) => {
    const Expenses = sequelize.define("expenses", {
      name: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      category: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      }
    });
    return Expenses;
  };