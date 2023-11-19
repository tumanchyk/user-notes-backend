const { login, register } = require('./auth');
const { getAllTasks, getTaskById, createTask, updatedTask, deleteTask } = require('./tasks');

module.exports = { login, register, getAllTasks, getTaskById, createTask, updatedTask, deleteTask };