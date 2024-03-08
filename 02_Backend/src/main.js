require('dotenv').config()
const { auth } = require('express-openid-connect');
const express = require('express')
const cors = require('cors');

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
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(authController);
app.use(expensesController);
app.use(userController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})