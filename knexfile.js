const pg = require('pg');


module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: '.data/dev.sqlite3'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (connection,done)=>{
        connection.run("PRAGMA foreign_keys = ON",done)
      }
    },migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  testing: {
    client: "sqlite3",
    connection:{
      filename:
      "./data/test.sqlite3"
    },
    useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations"
  },
  seeds: {
    directory: "./data/seeds"
  }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
