const db = require("../db/database.js");

const createUser = (newUser, result) => {
  db.query(`INSERT INTO tbl_user (authId, email, first_name, last_name) VALUES(?, ?, ?, ?)`,
    [newUser.authId, newUser.email, newUser.firstName, newUser.lastName],
    (err, res) => {
      if (err) {
        console.log(err)
        result(err, null)
      }
      console.log(res)
      result(null, { message: "User created successfully!" })
  });
}

module.exports = {
  createUser
}