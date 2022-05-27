const mysql = require("mysql");
const dbConfig = require("../config/dbConfig_secondary.js");

const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;