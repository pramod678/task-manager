const db = require('../config/db');

exports.createUser = (user, callback) => {
  const sql = 'INSERT INTO users SET ?';
  db.query(sql, user, callback);
};

exports.findByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};
