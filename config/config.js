require("dotenv").config();

module.exports = {
  development: {
    dialect: "mysql",
    host: "localhost",
    port: "3306",
    username: "root",
    database: "exampledb",
    password: process.env.DBPW
  },
  test: {
    dialect: "mysql",
    host: "localhost",
    port: "3306",
    username: "root",
    database: "exampledb",
    password: process.env.DBPW,
    logging: false
  },
  production: {
    dialect: "mysql",
    host: "localhost",
    port: "3306",
    database: JAWSDB_URL,
    username: process.env.DBUSER,
    password: process.env.DBPW
  }
};
