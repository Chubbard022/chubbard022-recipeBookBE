import dotenv from 'dotenv';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../helpers/User/register';
import registerHelper from '../helpers/User/register';

const route = express.Router();
dotenv.config()

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
          res.status(401).json({ message: 'Invalid Credentials' });
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
      successMessage: 'Successfully logged out',
    });
  } catch (error) {
    res.status(400).json({
      errorMessage: 'Something went wrong while logging out',
    });
  }
});

module.exports = route;
