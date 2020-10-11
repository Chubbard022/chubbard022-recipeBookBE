const knex = require("knex")
const knexConfig = require("../../knexfile")
const db = knex(knexConfig.development)

module.exports = {
    find, 
    findByUsername
}

async function find(){
    return await db("users")
        .select("username");
}

async function findByUsername(passedInUsername){
    return await db("users")
        .join("recipes","recipes.username", "=", "users.username")
        .where({"recipes.username": passedInUsername})
}