const db = require('../db/db');

function findByUserName(username) {
  return db.one('select * from users where username = $1', [username]);
}

module.exports = {
  findByUserName,
  findAll() {
    return db.any('select * from users');
  },

  create(user) {
    return db.none('insert into users(username) values (${username})', user)
      .then(() => findByUserName(user.username));
  }
};
