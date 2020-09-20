const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig.development);

module.exports = {
    findUser,
    findUserByName,
    update,
    favoritedUserRecipes,
    remove
}

//returns a list of all users
async function findUser(){
    return await db("users");
}

//returns a user based on their name
async function findUserByName(username){
    return await db("users")
                    .where({id})
                    .first();
}

//update a user given id and passed in updated user
async function update(id,updatedUser){
    let {username} = updatedUser;
    await db("users")
        .where({id})
        .update(updatedUser)

    return await findUserByName(username);
}
//returns a list of favorited recipes given passed in user
async function favoritedUserRecipes(username){
    return await("usersFavrotied")
        .join("favorited","favorited.id", "=","usersFavrotied.favorited")
        .where({"usersFavrotied,user_id": username})
}
//removes a user from site
async function remove(id){
    await db("users")
        .where({id})
        .del();
}