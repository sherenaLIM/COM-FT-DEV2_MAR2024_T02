const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

router.post('/users', async (req, res) => {
  console.log("New user signed up detected.");
  console.log(req.body);
})

module.exports = router;