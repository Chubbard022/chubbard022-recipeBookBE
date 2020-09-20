const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig.development);

module.exprorts = {
    find,
    findByName,
    recipeUsingPantry,
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
                .where({nameOfItem:itemName});
}

// returns recipe....
async function recipeUsingPantry(){
    //unknown yet 
}

//adds item to pantry list
async function add(newItem){
    const [itemName] = await db("nameOfItem")
                        .insert(newItem);
    return await findByName(itemName);
}

//update pantry item given passed id and updated pantry item
async function update(id,updatedPantryItem){
    return await db("nameOfItem")
            .where({id})
            .update(updatedPantryItem)
}
// removes item from list of pantry items
async function remove(id){
    return await db("nameOfItem")
            .where({id})
            .del()
}

