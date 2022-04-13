// MySQL DB Configuration
module.exports = {
    HOST: "localhost",
    USER: "admin",
    PASSWORD: "12345",
    DB: "savrDB",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };