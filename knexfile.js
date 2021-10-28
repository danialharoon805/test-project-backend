const config = require('config');

module.exports = {
  client: config.database.client,
  connection: {
    host: config.database.connection.host,
    user: config.database.connection.user,
    password: config.database.connection.password,
    database: config.database.connection.database
  },
  pool: {
    min: config.database.pool.min,
    max: config.database.pool.max
  },
  migrations: {
    tableName: config.database.migrations.tableName
  }
};
