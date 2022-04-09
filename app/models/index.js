const dbConfig = require("../config/db.config.js");
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

db.users = require("./users.model.js")(sequelize, Sequelize);
db.expenses = require("./expenses.model.js")(sequelize, Sequelize);
db.expenseTargets = require("./expenseTargets.model.js")(sequelize, Sequelize);
db.incomes = require("./incomes.model.js")(sequelize, Sequelize);
db.investments = require("./investments.model.js")(sequelize, Sequelize);
db.savings = require("./savings.model.js")(sequelize, Sequelize);
db.savingsGoals = require("./savingsGoals.model.js")(sequelize, Sequelize);
db.supportInbox = require("./supportInbox.model.js")(sequelize, Sequelize);

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

db.users.hasMany(db.supportInbox, { as: "supportInbox" });
db.supportInbox.belongsTo(db.users, {
  foreignKey: "userId",
  as: "toUserId",
});



module.exports = db;
