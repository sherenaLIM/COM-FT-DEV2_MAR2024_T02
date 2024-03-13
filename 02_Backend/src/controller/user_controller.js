const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const userService = require('../service/user_service.js');
const router = express.Router();

router.post('/users', async (req, res) => {
  console.log("New user signed up detected.");
  const createUserBody = {
    authId: req.body.user_id ? req.body.user_id : req.body.authId,
    email: req.body.email,
    firstName: req.body.username ? req.body.username : req.body.firstName,
    lastName: req.body.username ? req.body.username : req.body.lastName,
  }
  userService.createUser(createUserBody, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "User creation failed!" });
    }
    res.status(201).send(result);
  });
})

module.exports = router;