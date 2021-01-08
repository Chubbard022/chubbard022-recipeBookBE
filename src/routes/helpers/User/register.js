const knex = require("knex")
const knexConfig = require("../../../../knexfile");
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

const getAllUserInfo = () => {
  //knex.select('*').from('users').leftJoin('accounts', 'users.id', 'accounts.user_id')
   return db("users").join("recipes","users.username","=","recipes.username")
    .join("favorited","recipes.username","=","favorited.username")

}

module.exports = {
  register,
  login,
  getAll,
  getAllUserInfo
};