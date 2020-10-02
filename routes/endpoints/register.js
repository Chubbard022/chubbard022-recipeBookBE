const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const secret = require('../auth/secrets').jwtKey
const Users = require("../auth/authenticate")

module.exports = server => {
    server.post("/api/register", register);
    server.post("/api/login", login);
    server.get("/api/logout",logout)
  };

  function register(req, res) { 
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  
    Users.add(user)
      .then(users => {
        res.status(201).json(users);
      })
      .catch(err => {
        res.status(500).json({errorMessage:"error with registering"});
      });
  }

  function login(req, res) {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          let id = user.id
          console.log("user",req)
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token,
            id,
            username
          });
        } else {
          res.status(401).json({ errorMessage: "Username and/or Password are incorrect" });
        }
      })
      .catch(error => {
        res.status(500).json({errorMessage:"ERROR: loggin failed"});
      });
  }
  function logout(req, res) {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res
            .status(500)
            .json({ message: 'There was a problem logging out user.' });
        } else {
          res.status(200).json({ message: 'Bye, have a great time!' });
        }
      });
    } else {
      res.status(200).json({ message: 'Bye, have a great time!' });
    }
  }
  
  function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    };
  
    const options = {
      expiresIn: "1d"
    };
  
    return jwt.sign(payload, secret, options);
  }