// Investments table model
module.exports = (sequelize, Sequelize) => {
    const Investments = sequelize.define("investments", {
      date: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.FLOAT
      },
      portfolioAmount: {
        type: Sequelize.FLOAT
      }
    });
    return Investments;
  };