module.exports = (sequelize, Sequelize) => {
    const Incomes = sequelize.define("incomes", {
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