require('dotenv').config();
const express = require('express');
const db = require('../helpers/User/register');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../auth/authenticate');
const registerHelper = require('../helpers/User/register');

const route = express.Router();

// register route
route.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).json({ message: 'Missing username and password fields' });
  } else {
    const hash = bcrypt.hashSync(password, 10);
    db.register({ username, password: hash })
      .then(() => {
        res.status(201).json({ message: `You have registered, ${username}!` });
      })
      .catch((err) => res.status(500).json(err));
  }
});

// login route
route.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).json({ message: 'Missing username and password fields' });
  } else {
    db.login(username)
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: `30 days`,
          });
          //setting env token to hashed password
          process.env.TOKEN = token;

          res.json({ id: user.id, message: `Welcome ${username}`, token });
        } else {
          res.status(401).json({ messag: 'Invalid Credentials' });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

route.get('/allUserInfo', async (req, res) => {
  try {
    let getAllUserInfo = await registerHelper.getAllUserInfo();
    res.status(200).json(getAllUserInfo);
  } catch (error) {
    res.status(400).json({
      errorMessage: 'Sorry something went wrong getting all user data',
    });
    throw new Error(error);
  }
});

//need to change function
route.get('/logout', (req, res) => {
  try {
    process.env.TOKEN = '';
    res.status(200).json({
      successMessgae: 'Successfully logged out',
    });
  } catch (error) {
    res.status(400).json({
      errorMessage: 'Something went wrong while loggin out',
    });
  }
});

module.exports = route;
