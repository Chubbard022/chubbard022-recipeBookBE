
exports.up = function(knex) {
  return knex.schema.createTable("insperation",(tbl)=>{
      tbl.increments("id")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("insperation")
};
