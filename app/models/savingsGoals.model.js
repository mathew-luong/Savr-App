module.exports = (sequelize, Sequelize) => {
    const SavingsGoals = sequelize.define("savingsGoals", {
      date: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.FLOAT
      }
    });
    return SavingsGoals;
  };