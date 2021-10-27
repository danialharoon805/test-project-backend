
exports.up = knex => knex.schema.createTable('views', (table) => {

  table.increments("id");
  table.integer("post_id");
  table.integer("views");
  table.string('unique_user_id');
  table.timestamp('viewed_at');

});

exports.down = knex => knex.schema.dropTable('views');