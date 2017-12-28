const config = require('config');
const pgp = require('pg-promise')();
const connectionString = config.get('dbConfig.connectionString');

module.exports = pgp(connectionString);
