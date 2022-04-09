module.exports = (sequelize, Sequelize) => {
    const ExpenseTargets = sequelize.define("expenseTargets", {
      category: {
        type: Sequelize.STRING
      },
      percentage: {
        type: Sequelize.FLOAT
      }
    });
    return ExpenseTargets;
  };