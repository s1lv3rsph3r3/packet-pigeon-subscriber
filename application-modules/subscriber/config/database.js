const environment = require('../environment');

const { dbHost, dbUsername, dbPassword, dbDatabase } = environment.values();

const config = {
  host: dbHost,
  user: dbUsername,
  password: dbPassword,
  database: dbDatabase,
};

module.exports = config;
