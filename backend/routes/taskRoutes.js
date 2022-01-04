const express = require('express')
const router = express.Router()
const {
    getAllTasks, 
    getTaskById, 
    deleteTask, 
    createTask, 
    updateTask
} = require('../controllers/taskController.js')
const {protect, admin} = require('../middleware/authMiddleware.js')

router
    .route('/')
    .get(getAllTasks, protect)
    .post(createTask, protect, admin)

router
    .route('/:id')
    .get(getTaskById, protect, admin)
    .delete(deleteTask, protect, admin)
    .put(updateTask, protect, admin)

module.exports = router 