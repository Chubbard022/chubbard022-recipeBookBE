import knex from 'knex'
import knexConfig from '../../../../knexfile';
const db = knex(knexConfig.development);

module.exports = {
  find,
  findByName,
  findUserFavorited,
  add,
  remove,
};

//returns a list of all favorited recipes
async function find() {
  return await db('favorited');
}

//returns a favorited recipe based off of id
async function findByName(name) {
  return await db('favorited').where({ username: name });
}

//returns a list of recipes favorited by user
async function findUserFavorited(user) {
  //************************ */
  //************************ */
  //************************ */
  //************************ */
  //************************ */
  //************************ */
}

//adding a new favorited recipe to table
async function add(newFavRecipe) {
  // const [id] = await db('favorited').insert(newFavRecipe);
  // return findB(id);
}

//removes a favorited recipe given passed in id
async function remove(id) {
  return await db('favorited').where({ id }).del();
}
