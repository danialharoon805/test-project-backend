
exports.up = knex => knex.schema.createTable('news_post', (table) => {

  table.increments("id");
  table.integer("user_id");
  table.integer("views");
  table.integer("likes");
  table.string('heading');
  table.string('description');

});

exports.down = knex => knex.schema.dropTable('news_post');