const knex = require("knex");
const knexConfig = require("../../../../knexfile");
const db = knex(knexConfig.development);

module.exports = {
    findUser,
    findUserByName,
    favoritedUserRecipes,
    userRecipes,
    update,
    remove
}

//returns a list of all users
async function findUser(){
    return await db("users")
        .select("id","username")
}

//returns a user based on their name
async function findUserByName(username){
    return await db("users")
                    .where({username})
                    .select("id","username")
                    .first();
}

//returns a list of favorited recipes given passed in user
async function favoritedUserRecipes(username){
    return await("usersFavrotied")
        .join("favorited","favorited.id", "=","usersFavrotied.favorited")
        .where({"usersFavrotied.user_id": username})
}

//returns a list of recipes that are associated to a passed in user.
async function userRecipes(username){
    return await db("users")
            .join("recipes","recipes.username","=","users.username")
            .where({"recipes.username":username})

}
//update a user given id and passed in updated user
async function update(id,updatedUser){
    let {username} = updatedUser;
    await db("users")
        .where({id})
        .update(updatedUser)

    return await findUserByName(username);
}

//removes a user from site
async function remove(id){
    await db("users")
        .where({id})
        .del();
}

