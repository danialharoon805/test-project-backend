const config = require('config');

module.exports = {
  client: config.database.client,
  // connection:
  //   "mysql://root:SdCho2fs7xX7JerkN9LP@zuno-db-01.csm3un4ykbsi.us-east-1.rds.amazonaws.com:3306/zuno",
  connection: {
      database: config.database.connection.database,
      user: config.database.connection.user,
      password: config.database.connection.password
  },
  pool: {
      min: config.database.pool.min,
      max: config.database.pool.max
  },
  migrations: {
      tableName: config.database.migrations.tableName
  }
};