
exports.up = function(knex) {
    return knex.schema
        .createTable("users", user=>{
            user.increments("id")
            user.string("username",50).notNullable().unique()
            user.string("password",255).notNullable()
        })
        .createTable("inspiration",(inspiration)=>{
            inspiration.increments("inspo_id")
            inspiration.string("inspo_name")
            inspiration.string("inspo_ingredients")
            inspiration.string("inspo_instructions")
            inspiration.string("inspo_image")
            inspiration.boolean("inspo_favorited").notNullable()

        })
        .createTable("recipes", recipe=>{
            recipe.increments("recipe_id")
            recipe.string("recipe_name").notNullable()
            recipe.string("recipe_ingredients").notNullable()
            recipe.string("recipe_instructions").notNullable()
            recipe.string("recipe_username")
            recipe.boolean("recipe_favorited").defaultTo(false)
            recipe.string("category").notNullable()
        })
        .createTable("favorited",favorite=>{
            favorite.increments("favorited_id")
            favorite.string("favorited_name").notNullable()
            favorite.string("favorited_ingredients").notNullable()
            favorite.string("favorited_instructions").notNullable()
            favorite.string("favorited_username").notNullable()
            favorite.string("favorited_image")
            favorite.boolean("favorited")
        })
        
        .createTable("pantryItems",itm=>{
            itm.increments("pantry_id")
            itm.string("pantry_nameOfItem").notNullable();
            itm.integer("pantry_quantity").notNullable()
        })
        .createTable("recipeOfPantryItems",itm=>{
            itm.increments("id")
            itm.integer("recipe_id")
                .unsigned()
                .references("recipe_id")
                .inTable("recipes")
                .onDelete("CASCADE")
                .onUpdate("CASCADE")
            itm.integer("pantryItem_id")
                .unsigned()
                .references("pantry_id")
                .inTable("pantryItems")
                .onDelete("CASCADE")
                .onUpdate("CASCADE")
        })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("recipeOfPantryItems")
    .dropTableIfExists("pantryItems")
    .dropTableIfExists("favorited")
    .dropTableIfExists("recipes")
    .dropTableIfExists("inspiration")
    .dropTableIfExists("users")
};
