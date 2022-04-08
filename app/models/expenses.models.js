module.exports = (sequelize, Sequelize) => {
    const Expenses = sequelize.define("expenses", {
      userId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      category: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      }
    });
    return Expenses;
  };