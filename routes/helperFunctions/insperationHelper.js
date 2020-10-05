const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig.development);

module.exports = {
    add,
    find,
    findByName,
    findById,
    update,
    remove
}


async function add(newRecipe){
    return await db("inspiration")
                .insert(newRecipe);
    //return await findByName(newRecipe.name);
}

async function find(){
    return await db("inspiration");
}

async function findByName(name){
    return db("inspiration")
            .where({name})
            .first();
}

async function findById(id){
    return await db("inspiration")
                .where({id})
                .first();
}

async function update(id,updatedRecipe){
    await db("inspiration")
                .where({id})
                .update(updatedRecipe)
    return await findById(id);    
}

async function remove(id){
    await db("inspiration")
            .where({id})
            .del();
}
