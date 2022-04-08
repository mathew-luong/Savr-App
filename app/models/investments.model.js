module.exports = (sequelize, Sequelize) => {
    const Investments = sequelize.define("investments", {
      userId: {
        type: Sequelize.INTEGER
      },
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