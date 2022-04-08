module.exports = (sequelize, Sequelize) => {
    const Incomes = sequelize.define("incomes", {
      userId: {
        type: Sequelize.INTEGER
      },
      stream: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.FLOAT
      }
    });
    return Incomes;
  };