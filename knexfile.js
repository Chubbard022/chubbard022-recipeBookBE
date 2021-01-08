const pg = require('pg');


module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/data/dev.sqlite3'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (connection,done)=>{
        connection.run("PRAGMA foreign_keys = ON",done)
      }
    },migrations: {
      directory: "./src/data/migrations"
    },
    seeds: {
      directory: "./src/data/seeds"
    }
  },

  testing: {
    client: "sqlite3",
    connection:{
      filename:
      "./src/data/test.sqlite3"
    },
    useNullAsDefault: true,
  migrations: {
    directory: "./src/data/migrations"
  },
  seeds: {
    directory: "./src/data/seeds"
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
