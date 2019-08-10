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
    useEnvVariable: "JAWSDB_URL",
    dialect: "mysql",
    password: process.env.DBPW
  }
};
