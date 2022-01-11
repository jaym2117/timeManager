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
            unique: false
        }
    }, {
        timestamps: true
    }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task