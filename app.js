const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const checkAuth = require('./middleware/checkAuth');

const { Task, User } = require('./models')
const app = express();
    
app.use(bodyParser.json());


app.post("/login", async (req, res) => {
    try {
        const {email, password: pass} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
           return res.status(404).json({message: 'User not found'})
        }

        const isValid = await bcrypt.compare(pass, user.password);
        if (!isValid) {
           return res.status(404).json({message: 'Invalid password or email'})
        }
        const { password, ...userData } = user._doc;
        return res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
});

app.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password: pass, role } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pass, salt);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hash,
            role
        })
        const { password, ...userData } = user._doc;
        return res.status(201).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
});

app.get("/tasks", checkAuth, async (req, res) => {
    try{
        const tasks = await Task.find();
        return res.status(200).json(tasks);
    
    } catch (err) {
        console.log(err);
         return res.status(500).json({error: err.message});
    }
});

app.get("/tasks/:id", checkAuth, async (req, res) => {
    const taskId = req.params.id;
    try{
        const task = await Task.findById(taskId);
        if (!task) {
        return res.status(404).json({message: `Task with id: ${taskId} not found`})
        }
        return res.status(200).json(task);
    } catch (err) {
        console.log(err);
         return res.status(500).json({error: err.message});
    }
});

app.post("/tasks", checkAuth, async (req, res) => {
    try {
        const newTask = req.body;
        const task = await Task.create({
            name: newTask.name
        });

        if (!task) {
        return res.status(404).json({message: 'Task not created'})
        }

        return res.status(201).json({ task });
    } catch (err) {
        console.log(err);
         return res.status(500).json({error: err.message});
    }
});

app.put("/tasks/:id", checkAuth, async (req, res) => {
    try{
    const taskId = req.params.id;
    const {name} = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { name }, { new: true });
    if (!updatedTask) {
    return res.status(404).json({message: 'Task not updated'})
    }
    
    return res.status(200).json(updatedTask);
    } catch (err) {
        console.log(err);
         return res.status(500).json({error: err.message});
    }
})

app.delete("/tasks/:id", checkAuth, async (req, res) => {
    try{
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
        return res.status(404).json({message: 'Task not deleted'})
        }
        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err.message});
    }

})

module.exports = app;