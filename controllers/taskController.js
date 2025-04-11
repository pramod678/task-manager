const taskModel = require('../models/taskModel');

exports.createTask = (req, res) => {
  const task = { ...req.body, userId: req.user.id };
  taskModel.createTask(task, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Task created', id: result.insertId });
  });
};

exports.getTasksById = (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  taskModel.getTaskById(taskId, userId, (err, task) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!task.length) return res.status(404).json({ message: 'Task not found' });
    res.json(task[0]);
  });
};

exports.getTasks = (req, res) => {
  const userId = req.user.id;
  const { status, page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;

  const filters = {
    status,
    limit,
    offset,
  };

  taskModel.getUserTasks(userId, filters, (err, tasks) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(tasks);
  });
};

exports.updateTask = (req, res) => {
  taskModel.updateTask(req.params.id, req.user.id, req.body, (err, result) => {
    if (err || result.affectedRows === 0) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task updated' });
  });
};

exports.deleteTask = (req, res) => {
  taskModel.deleteTask(req.params.id, req.user.id, (err, result) => {
    if (err || result.affectedRows === 0) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  });
};
