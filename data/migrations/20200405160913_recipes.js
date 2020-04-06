
exports.up = function(knex) {
    return knex.schema.createTable("recipes", recipe=>{
  
        recipe.increments("id")
        recipe.string("name").notNullable()
        recipe.string("ingredients").notNullable()
        recipe.string("instructions").notNullable()
            
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipes")
};
