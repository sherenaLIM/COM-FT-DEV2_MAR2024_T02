const mysql = require("mysql");
require("dotenv").config();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});

connection.connect((error) => {
  if (error) {
    console.error(error);    
  } else {
    console.log("MySQL Database connected.");
  }
})

module.exports = connection;