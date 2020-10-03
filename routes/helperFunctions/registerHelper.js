const knex = require("knex")
const knexConfig = require("../../knexfile")
const db = knex(knexConfig.development)

const register = user => {
  return db('users').insert(user);
};

const login = (username) => {
  return db('users')
    .where({ username })
    .first();
};

const getAll = () => {
  return db('users');
};

module.exports = {
  register,
  login,
  getAll
};