module.exports = (sequelize, Sequelize) => {
    const Savings = sequelize.define("savings", {
      date: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.FLOAT
      }
    });
    return Savings;
  };