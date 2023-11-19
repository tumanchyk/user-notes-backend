const { Task } = require('../models');

const getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        return res.status(200).json(tasks);
    } catch (err) {
        console.log(err);
         return res.status(500).json({error: err.message});
    }
}

const getTaskById = async (req, res) => {
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
}

const createTask = async (req, res) => {
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
}

const updatedTask = async (req, res) => {
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
}

const deleteTask = async (req, res) => {
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
}

module.exports = { getAllTasks, getTaskById, createTask, updatedTask, deleteTask };
