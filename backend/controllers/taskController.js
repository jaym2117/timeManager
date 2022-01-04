const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel.js')

// @desc    Fetch all tasks
// @route   GET /api/tasks
// @access  Private/Admin
const getAllTasks = asyncHandler(async(req, res) => {
    const tasks = await Task.find({})
    res.json(tasks)
})

// @desc    Get task by id 
// @route   GET /api/tasks/:id
// @access  Private/Admin   
const getTaskById = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id)

    if (task) {
        res.json(task)
    } else {
        res.status(404)
        throw new Error('Task not found')
    }
})

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private/Admin
const createTask = asyncHandler(async(req, res) => {
    const {taskName, accountNumber} = req.body; 

    const taskExists = await Task.findOne({taskName})

    if (taskExists) {
        res.status(400)
        throw new Error('Task already exists')
    }

    const newTask = await Task.create({taskName, accountNumber})

    res.status(201).json(newTask)
})

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private/Admin
const updateTask = asyncHandler(async(req, res) => {
    const {taskName, accountNumber} = req.body; 

    const task = await Task.findById(req.params.id)

    if(task) {
        task.taskName = taskName
        task.accountNumber = accountNumber

        const updatedTask = await task.save()
        res.json(updatedTask)
    } else {
        res.status(404)
        throw new Error('Task not found')
    }
})

// @desc    Delete a task
// @route   DELETE /api/task/:id
// @access  Private/Admin
const deleteTask = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id)

    if (task) {
        await task.remove()
        res.json({message: 'Task removed'})
    } else {
        res.status(404)
        throw new Error('Task not found')
    }
})

module.exports = {
    getAllTasks, 
    getTaskById, 
    deleteTask, 
    createTask, 
    updateTask
}