module.exports = (sequelize, Sequelize) => {
    const Savings = sequelize.define("savings", {
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
    return Savings;
  };