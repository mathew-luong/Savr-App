// Support inbox routes
module.exports = app => {
  const supportInbox = require("../controllers/supportInbox.controller.js");
  var router = require("express").Router();
  
  router.post("/", supportInbox.create);
  router.get("/:userID", supportInbox.get);
  
  app.use('/api/support/inbox', router);
};