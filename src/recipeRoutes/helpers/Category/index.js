const knex = require("knex")
const knexConfig = require("../../../../knexfile");
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
    return await db("categories");
}

//returns a category given passed in parameter name
async function findByName(categroyName){
    return await db("categories")
                .where({name:categroyName})
                .first();
}

async function findById(categoryID){
    return await db("categories")
                .where({id:categoryID})
                .first();
}

//returns all recipes in catrgory given passed in parameter name
async function findAllRecipesInCategory(categoryName){
    return await db("categories")
        .join("recipes","recipes.category_name","=","categories.name")
        .where({"categories.name":categoryName});

}

//adds a new category to list
async function add(newCategory){
    return await db("categories")
        .insert(newCategory);
    // return await findByName(newCategory.name);
}

//updates existing cateogry given category ID and updated category name
async function update(categoryID, updatedCategory){
    await db("categories")
            .where({"id":categoryID})
            .update(updatedCategory)
    return await findById(categoryID);    
}

//removes a category given the id passed in
async function remove(categoryID){
    return await db("categories")
            .where({id:categoryID})
            .del();
}