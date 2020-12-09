const { Model } = require('objection');
const Knex = require('knex');
const dotenv = require('dotenv');
//const knexfile = require('./knexfile');

process.on('uncaughtException', (error) => {
  console.log(error.name, error.message);
  console.log('UNCAUGHT EXCEPTION!. Shuting down...');
  server.close().then(process.exit(1));
});

dotenv.config({ path: './config.env' });
const knexfile = require('./knexfile');

const app = require('./app');

// Initialize knex.
const knex = Knex(knexfile[process.env.NODE_ENV]);
knex
  .raw('SELECT 1')
  .then(() => {
    console.log('DB sucefully conected');
  })
  .catch((err) => {
    throw err;
  });

// Give the knex instance to objection.
Model.knex(knex);

console.log('Currently working on:', process.env.NODE_ENV);

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
  console.log(`http://localhost:${port}/`);
});

process.on('unhandledRejection', (error) => {
  console.log(error.name, error.message);
  console.log('UNHANDLER REJECTION!. Shuting down...');
  server.close().then(process.exit(1));
});
