// Server code reference: https://www.bezkoder.com/react-node-express-mysql/#Nodejs_Express_Back-end

const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

// const incomes = require("./app/controllers/incomes.controller.js");
// const users = require("./app/controllers/users.controller.js");
// const expenses = require("./app/controllers/expenses.controller.js");
// const expenseTargets = require("./app/controllers/expenseTargets.controller.js");
// const investments = require("./app/controllers/investments.controller.js");
// const savings = require("./app/controllers/savings.controller.js");
// const savingsGoals = require("./app/controllers/savingsGoals.controller.js");
// const supportInbox = require("./app/controllers/supportInbox.controller.js");


const incomes = db.incomes;
const users = db.users;
const expenses = db.expenses;
const expenseTargets = db.expenseTargets;
const investments = db.investments;
const savings = db.savings;
const savingsGoals = db.savingsGoals;
const supportInbox = db.supportInbox;

// const run = async () => {
//   // Auto-populate db with dummy data
//   await users.bulkCreate({"username":"user1","password":"12345","type":1},{"username":"user2","password":"12345","type":1},{"username":"user3","password":"12345","type":1},{"username":"admin","password":"12345","type":0})
//   await expenses.bulkCreate({"userId":1,"name":"Safeway","date":"1/1/2022","category":"Food","amount":200.53},{"userId":1,"name":"Safeway","date":"1/1/2022","category":"Food","amount":200.53},{"userId":1,"name":"Rent","date":"1/2/2022","category":"Food","amount":500},{"userId":1,"name":"Safeway","date":"1/3/2022","category":"Food","amount":350},{"userId":1,"name":"Safeway","date":"1/4/2021","category":"Food","amount":200.53},{"userId":1,"name":"Safeway","date":"1/5/2021","category":"Food","amount":390},{"userId":1,"name":"Safeway","date":"1/6/2021","category":"Food","amount":200.53},{"userId":1,"name":"Safeway","date":"1/7/2021","category":"Food","amount":300.53},{"userId":1,"name":"Safeway","date":"1/8/2021","category":"Food","amount":400.53},{"userId":1,"name":"Safeway","date":"1/9/2021","category":"Food","amount":600.53},{"userId":1,"name":"Safeway","date":"1/10/2021","category":"Food","amount":230.53},{"userId":1,"name":"Safeway","date":"1/11/2021","category":"Food","amount":700.53},{"userId":1,"name":"Safeway","date":"1/12/2021","category":"Food","amount":400.53})
//   await expenseTargets.bulkCreate({"userId":1,"category":"Food","percentage":20},{"userId":1,"category":"Rent","percentage":80})
//   await incomes.bulkCreate({"userId":1,"stream":"salary","date":"1/1/2022","amount":1500},{"userId":1,"stream":"Salary","date":"1/1/2022","amount":1400},{"userId":1,"name":"Rent","date":"1/2/2022","amount":1500},{"userId":1,"stream":"Salary","date":"1/3/2022","amount":1350},{"userId":1,"stream":"Salary","date":"1/4/2021","amount":1200.53},{"userId":1,"stream":"Salary","date":"1/5/2021","amount":1390},{"userId":1,"stream":"Salary","date":"1/6/2021","amount":1200.53},{"userId":1,"stream":"Salary","date":"1/7/2021","amount":1300.53},{"userId":1,"stream":"Salary","date":"1/8/2021","amount":1400.53},{"userId":1,"stream":"Salary","date":"1/9/2021","amount":1600.53},{"userId":1,"stream":"Salary","date":"1/10/2021","amount":1230.53},{"userId":1,"stream":"Salary","date":"1/11/2021","amount":1700.53},{"userId":1,"stream":"Salary","date":"1/12/2021","amount":1400.53})
//   await investments.bulkCreate({"userId":1,"date":"1/1/2022","portfolioAmount":1000,"amount":200.53},{"userId":1,"date":"1/1/2022","portfolioAmount":1000,"amount":200.53},{"userId":1,"name":"Rent","date":"1/2/2022","portfolioAmount":1000,"amount":500},{"userId":1,"date":"1/3/2022","portfolioAmount":1000,"amount":350},{"userId":1,"date":"1/4/2021","portfolioAmount":1000,"amount":200.53},{"userId":1,"date":"1/5/2021","portfolioAmount":1000,"amount":390},{"userId":1,"date":"1/6/2021","portfolioAmount":1000,"amount":200.53},{"userId":1,"date":"1/7/2021","portfolioAmount":1000,"amount":300.53},{"userId":1,"date":"1/8/2021","portfolioAmount":1000,"amount":400.53},{"userId":1,"date":"1/9/2021","portfolioAmount":1000,"amount":600.53},{"userId":1,"date":"1/10/2021","portfolioAmount":1000,"amount":230.53},{"userId":1,"date":"1/11/2021","portfolioAmount":1000,"amount":700.53},{"userId":1,"date":"1/12/2021","portfolioAmount":1000,"amount":400.53})
//   await savings.bulkCreate({"userId":1,"date":"1/1/2022","amount":200.53},{"userId":1,"date":"1/1/2022","amount":200.53},{"userId":1,"name":"Rent","date":"1/2/2022","amount":500},{"userId":1,"date":"1/3/2022","amount":350},{"userId":1,"date":"1/4/2021","amount":200.53},{"userId":1,"date":"1/5/2021","amount":390},{"userId":1,"date":"1/6/2021","amount":200.53},{"userId":1,"date":"1/7/2021","amount":300.53},{"userId":1,"date":"1/8/2021","amount":400.53},{"userId":1,"date":"1/9/2021","amount":600.53},{"userId":1,"date":"1/10/2021","amount":230.53},{"userId":1,"date":"1/11/2021","amount":700.53},{"userId":1,"date":"1/12/2021","amount":400.53})
//   await savingsGoals.bulkCreate({"userId":1,"date":"1/10/2022","amount":10000},{"userId":1,"date":"1/1/2023","amount":15000})
//   await supportInbox.bulkCreate({"fromUserId":1,"date":"1/1/2022","readStatus":0,"subject":"Account Settings Help!","content":"Hello, I need help finding account settings!"},{"toUserId":1,"date":"1/2/2022","readStatus":1,"subject":"Reset Password","content":"Hello user, We have reset password as requested!"})
//   return Promise.resolve()
// };


db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
  // run().then(() => {
  //   const data = users.findAll();
  //   console.log(">> All users", JSON.stringify(data, null, 2));
  // })
 });



app.get("/", (req, res) => {
  res.json({ message: "Welcome to Savr application backend." });
});

require("./app/routes/dashboard.routes.js")(app);
require("./app/routes/expenses.routes.js")(app);
require("./app/routes/expensesBreakdown.routes.js")(app);
require("./app/routes/expenseTargets.routes.js")(app);
require("./app/routes/incomes.routes.js")(app);
require("./app/routes/investments.routes.js")(app);
require("./app/routes/login.routes.js")(app);
require("./app/routes/savings.routes.js")(app);
require("./app/routes/savingsGoals.routes.js")(app);
require("./app/routes/savingsStats.routes.js")(app);
require("./app/routes/savingStringStats.routes.js")(app);
require("./app/routes/signup.routes.js")(app);
require("./app/routes/supportInbox.routes.js")(app);
require("./app/routes/totalExpenses.routes.js")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
