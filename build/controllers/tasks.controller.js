import { getConnection } from "../db.js";
import { nanoid } from "nanoid";
export const getTasks = (req, res) => {
    const data = getConnection().data.tasks;
    return res.json(data);
};
export const createTask = (req, res) => {
    const { name, description } = req.body;
    const newTask = {
        name,
        description,
        id: nanoid()
    };
    try {
        const db = getConnection();
        db.data.tasks.push(newTask);
        db.write();
        res.json(newTask);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
export const getTask = (req, res) => {
    const taskFound = getConnection().data.tasks.find((task) => task.id === req.params.id);
    if (!taskFound)
        return res.sendStatus(404);
    res.json(taskFound);
};
export const count = (req, res) => {
    const totalTasks = getConnection().data.tasks.length;
    res.json(totalTasks);
};
export const deleteTask = (req, res) => {
    const deletedTask = getConnection();
    const taskFound = deletedTask.data.tasks.find((t) => t.id === req.params.id);
    if (!taskFound)
        return res.sendStatus(404);
    const newTask = deletedTask.data.tasks.filter((t) => t.id !== req.params.id);
    deletedTask.data.tasks = newTask;
    deletedTask.write();
    res.json(taskFound);
};
export const updateTask = (req, res) => {
    const updatedTask = getConnection();
    const taskFound = updatedTask.data.tasks.find((t) => t.id === req.params.id);
    if (!taskFound)
        return res.sendStatus(404);
    taskFound.name = req.body.name;
    taskFound.description = req.body.description;
    updatedTask.data.tasks.map((t) => (t.id === req.params.id ? taskFound : t));
    updatedTask.write();
    res.send(taskFound);
};
