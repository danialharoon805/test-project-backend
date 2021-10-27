
exports.up = knex => knex.schema.createTable('likes', (table) => {

  table.increments("id");
  table.integer("post_id");
  table.integer("likes");
  table.string('unique_user_id');
  table.timestamp('liked_at');

});

exports.down = knex => knex.schema.dropTable('likes');