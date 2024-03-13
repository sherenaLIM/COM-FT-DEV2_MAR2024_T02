const db = require("../db/database.js");

const createUser = (newUser) => {
  db.query(`INSERT INTO users (authId, email, firstName, lastName) VALUES(?, ?, ?, ?)`,
    newUser.authId, newUser.email, newUser.firstName, newUser.lastName,
    (err, results) => {
      if (err) {
        console.log(err);
        throw err;
      }
      return results;
    });
}

module.exports = {
  createUser
}