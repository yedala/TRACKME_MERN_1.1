const Task = require('../models/taskModel');
const asyncHandler = require("express-async-handler");

const getTasks = asyncHandler(async (req, res) => {
    const { status, pageNo, search } = req.query;
    try {
        let query = { user: req.user._id };
        if (status != 'ALL') query.status = status;
        if (search != 'ALL') {
            query = {
                ...query,
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { context: { $regex: search, $options: 'i' } }
                ]
            }
        }

        const tasks = await Task.find(query)
            .limit(5)
            .skip((pageNo - 1) * 5)
            .exec();
        const count = await Task.countDocuments(query);

        res.json({
            tasks,
            totalPages: Math.ceil(count / 5),
            currentPage: pageNo
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }


});

const createTask = asyncHandler(async (req, res) => {
    const { title, content, createdDate, status } = req.body;
    if (!title || !content || !status) {
        res.status(401);
        throw new Error("pls fill all the fields");
    }
    else {
        const task = new Task({ user: req.user._id, title, content, status, createdDate });
        const createTask = await task.save();
        res.status(201).json(createTask);


    }
});

const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task) {
        res.json(task);
    }
    else {
        res.status(404).json({ message: "Not Found" })
    }
});

const deleteTaskById = asyncHandler(async (req, res) => {


    const task = await Task.findById(req.params.id);

    if (task.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }



    if (task) {
        await task.deleteOne();
        res.json({ message: "Task Removed Successfully" });
    }
    else {
        res.status(404);
        throw new Error("Task not Found");
    }
});

const updateTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    const { title, content, status } = req.body;
    if (task) {
        task.title = title,
            task.content = content,
            task.status = status;
        const updatedTask = await task.save()
        res.json(updatedTask);
    }
    else {
        res.status(404);
        throw new Error("Task not Found");
    }
})



module.exports = { getTasks, createTask, getTaskById, updateTaskById, deleteTaskById };