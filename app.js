const express = require("express");
const bodyParser = require("body-parser");
const { checkAdmin, checkAuth } = require('./middleware');
const { login, register, getAllTasks, getTaskById, createTask, updatedTask, deleteTask } = require('./controllers');

const app = express();
    
app.use(bodyParser.json());


app.post("/login", login);

app.post("/register", register);

app.get("/tasks", checkAuth, getAllTasks);

app.get("/tasks/:id", checkAuth, getTaskById);

app.post("/tasks", checkAuth, checkAdmin, createTask);

app.put("/tasks/:id", checkAuth, checkAdmin, updatedTask)

app.delete("/tasks/:id", checkAuth, checkAdmin, deleteTask)

module.exports = app;