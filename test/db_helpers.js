const config = require('config');
const pgp = require('pg-promise')();
const db = require('../api/db/db');

module.exports = {
  clearTable(tableName) {
    return db.none('delete from $1~', [tableName]);
  }
};
