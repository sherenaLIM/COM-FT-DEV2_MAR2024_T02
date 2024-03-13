const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const userService = require('../service/user_service.js');
const router = express.Router();

router.post('/users', async (req, res) => {
  console.log("New user signed up detected.");
  const createUserBody = {
    authId: req.body.user_id,
    email: req.body.email,
    firstName: req.body.username,
    lastName: req.body.username,
  }
  userService.createUser(createUserBody, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "User creation failed!" });
    }
    res.status(201).send(result);
  });
})

module.exports = router;