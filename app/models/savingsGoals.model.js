module.exports = (sequelize, Sequelize) => {
    const SavingsGoals = sequelize.define("savingsGoals", {
      userId: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.FLOAT
      }
    });
    return SavingsGoals;
  };