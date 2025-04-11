const db = require('../config/db');

exports.createTask = (task, callback) => {
  db.query('INSERT INTO tasks SET ?', task, callback);
};

exports.getUserTasks = (userId, filters, callback) => {
  const { status, limit, offset } = filters;

  let query = 'SELECT * FROM tasks WHERE userId = ?';
  const params = [userId];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  query += ' ORDER BY dueDate ASC LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));

  db.query(query, params, callback);
};


exports.getTaskById = (id, userId, callback) => {
  db.query('SELECT * FROM tasks WHERE id = ? AND userId = ?', [id, userId], callback);
};

exports.updateTask = (id, userId, task, callback) => {
  db.query('UPDATE tasks SET ? WHERE id = ? AND userId = ?', [task, id, userId], callback);
};

exports.deleteTask = (id, userId, callback) => {
  db.query('DELETE FROM tasks WHERE id = ? AND userId = ?', [id, userId], callback);
};
