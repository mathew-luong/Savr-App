// Controller reference: https://www.bezkoder.com/node-js-express-sequelize-mysql/#Create_the_Controller

const db = require("../models");
const SupportInbox = db.supportInbox;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if ((!req.body.fromUserID && !req.body.toUserID) || !req.body.subject || !req.body.body) {
        res.status(400).send({
          message: "Did not receive all required information: userID, subject and body!"
        });
        return;
      }
    // Create a message
    const message = {
        fromUserId: req.body.fromUserID,
        toUserId: req.body.toUserID,
        date: new Date(),
        subject: req.body.subject,
        body: req.body.body
        };
    SupportInbox.create(message)
    .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating message."
    });
});
}

exports.get = (req, res) => {
    // Validate request
    if (!req.param('userID')) {
        res.status(400).send({
            message: "Did not receive all required information: userID!"
        });
        return;
    }
    const userId = req.param('userID');
    SupportInbox.findAll({
        where: {
            [Op.or]:{
                fromUserId: userId,
                toUserId: userId  
            }
        }
      }).then(data => {
          if(data){
            res.send(data);
        }else{
            res.status(400).send({
                message: "Did not find any messages!"
            });
            return;
        }
      })

};
