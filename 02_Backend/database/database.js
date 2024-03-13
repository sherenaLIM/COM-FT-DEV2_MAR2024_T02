// Step 1: define our paramenters
// we need to use the mysql module
const mysql = require("mysql");
// hiding connection parameters in the .env file
// so we need the dotenv module
require("dotenv").config({ path: '../config/.env' });
// bring our connection parameters from .env
parameters = {
host: process.env.DB_HOST,
port: process.env.DB_PORT,
user: process.env.DB_USER,
password: process.env.DB_PASS,
database: process.env.DB_NAME,
multipleStatements: true,
};

// Step 2: establish a connection to the database
// now we use the methods available from the mysql module
// first invoke the mysql module’s .createConnection method
const mysqlConnection = mysql.createConnection(parameters);
// now invoke the .connect method
mysqlConnection.connect((error) => {
if (error) {
console.log(error);
} else {
// if successful, write a message to the console
console.log("Connected to MySQL");
}
});

mysqlConnection.query(`SELECT * from tbl_user`, (err, results) => {
    if (err) {
    console.log(err);
    } else {
    console.log(results);
    }
    });
    
    


