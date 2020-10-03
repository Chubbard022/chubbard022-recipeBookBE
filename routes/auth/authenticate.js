require('dotenv').config();
const db = require("../../data/dbConfig.js")
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET;

module.exports = {
    authenticate,
    add,
    find,
    findBy,
    findById
  };
  
  function authenticate(req, res, next) {
    const token = process.env.TOKEN;
    if (token !== "") {
      jwt.verify(token, jwtKey, (err, decoded) => {
        if (err) return res.status(401).json(err);
  
        req.decoded = decoded;
  
        next();
      });
    } else {
      return res.status(401).json({
        error: 'No token provided, must be set on the Authorization Header'
      });
    }
  }
  
  function find() {
    return db("users").select("id", "username", "password");
  }
  
  function findBy(filter) {
    return db("users").where(filter);
  }
  
  async function add(user) {
    const [id] = await db("users").insert(user);
  
    return findById(id);
  }
  
  function findById(id) {
    return db("users")
      .where({ id })
      .first();
  }