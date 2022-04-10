module.exports = (sequelize, Sequelize) => {
    const SupportInbox = sequelize.define("supportInbox", {
      fromUserId: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      readStatus: {
        type: Sequelize.BOOLEAN
      },
      subject: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      }
    });
    return SupportInbox;
  };