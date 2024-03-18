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
};

const getUserById = (userId, result) => {
  db.query('SELECT * FROM tbl_user WHERE user_id = ?',
  [userId],
  (err, res) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      if (res.length) {
        result(null, res[0]);
      } else {
        result({ message: "User not found" }, null);
      }
    }
  }
  );
};

const getALLUsers = (result) => {
  db.query('SELECT * FROM tbl_user',
  (err, res) => {
    if (err) {
      console.log(err);
      result(err, null); 
    } else {
      result(null, res);
    }
  }
  );
};

module.exports = {
  createUser,
  getUserById,
  getALLUsers
};