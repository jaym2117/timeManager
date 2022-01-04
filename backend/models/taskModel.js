const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        taskName: {
            type: String, 
            required: true,
            unique: true
        }, 
        accountNumber: {
            type: String, 
            required: true, 
            unique: true
        }
    }, {
        timestamps: true
    }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task