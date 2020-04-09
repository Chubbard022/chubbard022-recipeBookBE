
exports.up = function(knex) {
  return knex.schema.createTable("inspiration",(tbl)=>{
        tbl.increments("id")
        tbl.string("name")
        tbl.string("ingredients")
        tbl.string("instructions")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("inspiration")
};
