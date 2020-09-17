
exports.up = function(knex) {
    return knex.schema
        .createTable("users", user=>{
            user.increments("id")
            user.string("username",50).notNullable().unique()
            user.string("password",255).notNullable()
        })
        .createTable("inspiration",(inspiration)=>{
            inspiration.increments("id")
            inspiration.string("name")
            inspiration.string("ingredients")
            inspiration.string("instructions")
            inspiration.string("image")
            inspiration.boolean("favorited").notNullable()

        })
        .createTable("recipes", recipe=>{
            recipe.increments("id")
            recipe.string("name").notNullable()
            recipe.string("ingredients").notNullable()
            recipe.string("instructions").notNullable()
            recipe.string("username")
            recipe.boolean("favorited").notNullable()
        })
        .createTable("favorited",favorite=>{
            favorite.increments("id")
            favorite.string("name").notNullable()
            favorite.string("ingredients").notNullable()
            favorite.string("instructions").notNullable()
            favorite.string("username").notNullable()
            favorite.string("image")
            favorite.boolean("favorited")
        })
        
        //need to add mutual table for favorited and users

        // need to add table for pantry

        //need to add mutual table for pantry and recipe
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("favorited")
        .dropTableIfExists("recipes")
        .dropTableIfExists("inspiration")
        .dropTableIfExists("users")
};
