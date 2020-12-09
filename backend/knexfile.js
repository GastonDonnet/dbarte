const knexStringcase = require('knex-stringcase');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

options = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'admin',
      password: 'admin',
      database: 'test',
      timezone: '-00:00',
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'admin',
      password: 'admin',
      database: 'test',
      timezone: '-00:00',
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
    // migratios: {
    //   tableName: 'knex_migrations',
    //   directory: './db/migrations',
    // },
    // seeds: {
    //   directory: './db/seeds',
    // },
  },
};

module.exports = {
  development: knexStringcase(options['development']),
  production: knexStringcase(options['production']),
};
