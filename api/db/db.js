const pgp = require('pg-promise')();
const connectionString = 'postgres://localhost:5432/scuttlebutt';

module.exports = pgp(connectionString);
