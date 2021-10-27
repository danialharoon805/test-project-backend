const http = require('http');

const expressRoutes = require('./routes/index');

const {
  knex,
  config
} = require('./helpers');

const port = config.port;

const startServer = async () => {

  try {

    console.log('Running migrations...');
    await knex.migrate.latest();
    console.log('Migrations successfully run');

  } catch (error) {

    console.log('Database Connection Error', error);

    process.exit(1);

  }

  const server = http.createServer(expressRoutes);

  server.listen(port, (err) => {

    if (err) {

      return console.log('ERR:: launching server ', err);

    }

    console.log(`API server is live at localhost:`, port);

  });

};

process.on('uncaughtException', (err) => {

  console.log('Uncaught Exception thrown', err);

});

process.on('unhandledRejection', (reason, p) => {

  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);

});

startServer();
