
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
        .createTable("pantryItems",itm=>{
            itm.increments("id")
            itm.string("nameOfItem").notNullable();
            itm.integer("quantity").notNullable()
        })
        .createTable("usersFavrotied",usr=>{
            usr.increments("id")
            usr.integer("user_id")
                .unsigned()
                .references("id")
                .inTable("users")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE")
            usr.integer("favorited")
                .unsigned()
                .references("id")
                .inTable("favorited")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE")
        })
        .createTable("recipeOfPantryItems",itm=>{
            itm.increments("id")
            itm.integer("recipe_id")
                .unsigned()
                .references("id")
                .inTable("recipes")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE")
            itm.integer("pantryItem_id")
                .unsigned()
                .references("id")
                .inTable("pantryItems")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE")
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("pantryItems")
        .dropTableIfExists("usersFavrotied")
        .dropTableIfExists("favorited")
        .dropTableIfExists("recipes")
        .dropTableIfExists("inspiration")
        .dropTableIfExists("users")
};
