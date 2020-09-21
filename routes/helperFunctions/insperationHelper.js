const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig.development);

module.exprorts = {
    add,
    find,
    findByName,
    findById
}


async function add(newRecipe){
    await db("inspiration")
                .insert(newRecipe);
                
    return await findByName(newRecipe.name);
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

