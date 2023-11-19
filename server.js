const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const dbName = "tasks.db";

const port = 7000;
const db = new sqlite3.Database(dbName);

const checkExist = (task, res, id) => {
    if (!task) {
        return res.status(404).json({message: `Task with id: ${id} not found`})
    }
}
const serverError = (err, res) => {
    if (err) {
        return res.status(500).json({error: err.message})
    }
}

app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.send("hello Express")
});
app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", (err, rows) => {
        serverError(err, res);
        return res.status(200).json(rows);
    })
});

app.get("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    db.get("SELECT * FROM tasks WHERE id = ?", taskId, (err, row) => {
        serverError(err, res);
        checkExist(row, res, taskId);
        return res.status(200).json(row);
    })
});

app.post("/tasks", (req, res) => {
    const newTask = req.body;
    db.run('INSERT INTO tasks (name) VALUES(?)', [newTask.name], (err) => {
        serverError(err, res)
        return res.status(201).json({id: this.lastID})

    })
    
});

app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;
    db.run("UPDATE tasks SET name = ? WHERE id = ?", [updatedTask.name], [taskId], (err) => {
        serverError(err, res);
        return res.status(200).json({ id: taskId, name: updatedTask.name });
    })
})

app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    db.run("DELETE FROM tasks WHERE id = ?", taskId, (err) => {
        serverError(err, res);
        return res.status(204).send();

    })

})

app.listen(port, () => {
    console.log(`App is running in ${port} port`);
})