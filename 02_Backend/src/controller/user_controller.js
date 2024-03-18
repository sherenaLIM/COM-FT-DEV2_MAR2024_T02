const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const userService = require('../service/user_service.js');
const router = express.Router();

// Route to create new user 
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

// Route to get user by id
router.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  userService.getUserById(userId, (err, user) => {
    if (err) {
      res.status(500).send({ message: err.message || "Error retrieving user by ID" });
    } else {
      res.status(200).send(user);
    }
  });
});

// Route to get all users
router.get('/users', async (req, res) => {
  userService.getALLUsers((err, users) => {
    if (err) {
      res.status(500).send({ message: err.message || "Error retrieving all users" });
    } else {
      res.status(200).send(users);
    }
  });
});

module.exports = router;