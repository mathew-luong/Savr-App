const dbConfig = require("../config/db.config.js");
const mysql = require("mysql2");

// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER, 
  password: dbConfig.PASSWORD,
});

// Run create database statement in case database doesn't exist
connection.query(
  `CREATE DATABASE IF NOT EXISTS savrDB`,
);

// Close the connection
connection.end();

// Setting up sequelize library for queries
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Database table models
db.users = require("./users.model.js")(sequelize, Sequelize);
db.expenses = require("./expenses.model.js")(sequelize, Sequelize);
db.expenseTargets = require("./expenseTargets.model.js")(sequelize, Sequelize);
db.incomes = require("./incomes.model.js")(sequelize, Sequelize);
db.investments = require("./investments.model.js")(sequelize, Sequelize);
db.savings = require("./savings.model.js")(sequelize, Sequelize);
db.savingsGoals = require("./savingsGoals.model.js")(sequelize, Sequelize);
db.supportInbox = require("./supportInbox.model.js")(sequelize, Sequelize);


// Setting database relations and foreign keys
db.users.hasMany(db.expenses, { as: "expenses" });
db.expenses.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.users.hasMany(db.expenseTargets, { as: "expenseTargets" });
db.expenseTargets.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.users.hasMany(db.incomes, { as: "incomes" });
db.incomes.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.users.hasMany(db.investments, { as: "investments" });
db.investments.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.users.hasMany(db.savings, { as: "savings" });
db.savings.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.users.hasMany(db.savingsGoals, { as: "savingsGoals" });
db.savingsGoals.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});


module.exports = db;
