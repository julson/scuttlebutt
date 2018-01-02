const db = require('../db/db');

module.exports = {
  send(fromUserId, toUserId, message) {
    const stmt = 'insert into messages(from_user_id, to_user_id, text) values ($1, $2, $3)';
    return db.none(stmt, [fromUserId, toUserId, message]);
  },

  getLog(fromUserId, toUserId) {
    const stmt = 'select u.username, m.text, m.date_created from users as u '
          + 'join messages as m on u.id = m.from_user_id '
          + 'where (m.from_user_id = $1 and m.to_user_id = $2) '
          + 'or (m.from_user_id = $2 and m.to_user_id = $1) '
          + 'order by m.date_created asc';
    return db.any(stmt, [fromUserId, toUserId]);
  }
};
