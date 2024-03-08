const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

// req.isAuthenticated is provided from the auth router
router.get('/', async (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), async (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

router.get('/verify_login', async (req, res) => {
  res.send({
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
  })
});

module.exports = router;