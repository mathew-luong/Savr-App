// Support inbox table model
module.exports = (sequelize, Sequelize) => {
    const SupportInbox = sequelize.define("supportInbox", {
      toUserId: {
        type: Sequelize.INTEGER
      },
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