const db = require('../db/db');

module.exports = {
  send(fromUserId, toUserId, message) {
    const stmt = 'insert into messages(from_user_id, to_user_id, text) values ($1, $2, $3)';
    return db.none(stmt, [fromUserId, toUserId, message]);
  }
};
