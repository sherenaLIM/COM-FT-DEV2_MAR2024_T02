require('dotenv').config()
const { auth } = require('express-openid-connect');
const express = require('express')
const cors = require('cors');
const cookie = require('cookie');

const authController = require('./controller/auth_controller.js');
const expensesController = require('./controller/expenses_controller.js');
const userController = require('./controller/user_controller.js');

const app = express()
const port = process.env.PORT
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  routes: {
    login: false,
    postLogoutRedirect: '/custom_logout'
  }
};

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: ['https://com-ft-dev2-mar2024-t02-1.onrender.com', 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get('/login', (req, res) =>
  res.oidc.login({
    returnTo: `${process.env.AUTH0_RETURN_TO_URL}`,
    authorizationParams: {
      redirect_uri: `${process.env.AUTH0_CALLBACK_URL}`,
    },
  })
);

app.get('/callback', (req, res) => {
  res.oidc.callback({
    redirect_uri: `${process.env.AUTH0_CALLBACK_URL}`,
  })
});

app.post('/callback', (req, res) => {
  res.oidc.callback({
    redirect_uri: `${process.env.AUTH0_CALLBACK_URL}`,
  })
});

app.get('/custom_logout', (req, res) => {
  res.redirect(`${process.env.AUTH0_RETURN_TO_URL}`)
});

app.use(authController);
app.use('/api/v1', expensesController);
app.use('/api/v1', userController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})