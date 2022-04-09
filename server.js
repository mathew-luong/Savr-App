// Server code reference: https://www.bezkoder.com/react-node-express-mysql/#Nodejs_Express_Back-end

const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
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
