import knex from 'knex'
import knexConfig from '../../../../knexfile';
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  findByName,
  add,
  update,
  remove,
};

//returns all recipes
async function find() {
  return await db('recipes');
}

//returns recipe given passed in id
async function findById(id) {
  return await db('recipes').where({ id });
}

//returns recipes given passed in username
async function findByName(username) {
  return await db('recipes').where({ username });
}

//adds a new recipe to table
async function add(newRecipe) {
  const [id] = await db('recipes').insert(newRecipe);
  return await findById(id);
}

//updates recipe given id and passed in updated recipe
async function update(id, updatedRecipe) {
  await db('recipes').where({ id }).update(updatedRecipe);

  return await findById(id);
}

//removes recipe given passed in id
async function remove(id) {
  return await db('recipes').where({ id }).del();
}
