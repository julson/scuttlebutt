const db = require('../db/db');

function findByUsername(username) {
  return db.one('select * from users where username = $1', [username]);
}

module.exports = {
  findByUsername,
  findAll() {
    return db.any('select * from users');
  },

  create(user) {
    return db.none('insert into users(username) values (${username})', user)
      .then(() => findByUsername(user.username));
  }
};
