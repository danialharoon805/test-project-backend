
exports.up = knex => knex.schema.createTable('users', (table) => {

  table.increments("id");
  table.string("email").notNullable().unique();
  table.string("password", 100);
  table.string("name");
  table.string('access_token').unique();

});

exports.down = knex => knex.schema.dropTable('users');