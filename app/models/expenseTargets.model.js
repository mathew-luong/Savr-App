module.exports = (sequelize, Sequelize) => {
    const ExpenseTargets = sequelize.define("expenseTargets", {
      userId: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      percentage: {
        type: Sequelize.FLOAT
      }
    });
    return ExpenseTargets;
  };