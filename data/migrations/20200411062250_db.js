
exports.up = function(knex) {
    return knex.schema
        .createTable("users", user=>{
    
            user.increments("id")

            user.string("username",50)
                .notNullable()
                .unique()
            user.string("password",255)
                .notNullable()
            
                
    })
    .createTable("inspiration",(tbl)=>{
        tbl.increments("id")
        tbl.string("name")
        tbl.string("ingredients")
        tbl.string("instructions")
    })
    .createTable("recipes", recipe=>{
    
        recipe.increments("id")
        recipe.string("name").notNullable()
        recipe.string("ingredients").notNullable()
        recipe.string("instructions").notNullable()
        recipe.string("usernames")
                
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("recipes")
        .dropTableIfExists("inspiration")
        .dropTableIfExists("users")
};
