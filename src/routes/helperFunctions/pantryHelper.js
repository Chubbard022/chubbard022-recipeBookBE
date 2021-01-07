const knex = require("knex")
const knexConfig = require("../../knexfile")
const db = knex(knexConfig.development)

module.exports = {
    find,
    findByName,
    add,
    update,
    remove
}

//returns list of pantry items
async function find(){
    return await db("pantryItems");
}

//returns a pantry item given passed in item name
async function findByName(itemName){
    return await db("pantryItems")
                .where({nameOfItem:itemName})
                .first()
}

//adds item to pantry list
async function add(newItem){
    await db("pantryItems")
            .insert(newItem);
    return await findByName(newItem.nameOfItem);
}

//update pantry item given passed id and updated pantry item
async function update(id,updatedPantryItem){
    return await db("pantryItems")
            .where({id})
            .update(updatedPantryItem)
}
// removes item from list of pantry items
async function remove(id){
    return await db("pantryItems")
            .where({id})
            .del()
}

