const knex = require("knex")
const knexConfig = require("../../knexfile")
const db = knex(knexConfig.development)

module.exports = {
    find,
    findById,
    findByName,
    findAllRecipesInCategory,
    add,
    update,
    remove
}

//returns a list of all categories
async function find(){
    return await db("category");
}

//returns a category given passed in parameter name
async function findByName(categroyName){
    return await db("category")
                .where({name:categroyName})
                .first();
}

async function findById(categoryID){
    return await db("category")
                .where({id:categoryID})
                .first();
}

//returns all recipes in catrgory given passed in parameter name
async function findAllRecipesInCategory(categoryName){
    return await db("category")
        .join("recipes","recipes.category_name","=","category.name")
        .where({"category.name":categoryName});

}

//adds a new category to list
async function add(newCategory){
    await db("category")
        .insert(newCategory);
    return await findByName(newCategory.name);
}

//updates existing cateogry given category ID and updated category name
async function update(categoryID, updatedCategory){
    await db("category")
            .where({"id":categoryID})
            .update(updatedCategory)
    return await findById(categoryID);    
}

//removes a category given the id passed in
async function remove(categoryID){
    return await db("category")
            .where({id:categoryID})
            .del();
}