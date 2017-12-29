const db = require('../db/db');

function findById(id) {
  return db.one('select * from users where id = $1', [id]);
}

module.exports = {
  findByUsername(username) {
    return db.one('select * from users where username = $1', [username]);
  },

  findAll() {
    return db.any('select * from users');
  },

  create(user) {
    return db.one('insert into users(username) values (${username}) returning id', user)
      .then(result => findById(result.id));
  },

  deleteById(userId) {
    return db.none('delete from users where id=$1', [userId]);
  }
};
