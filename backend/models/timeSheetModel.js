const mongoose = require('mongoose')

const timesheetSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    }, 
    timesheetDate: {
        type: Date, 
        required: true
    }, 
    timeEntries: [{
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true, 
            ref: 'User'
        }, 
        task: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true, 
            ref: 'Task'
        }, 
        startDateTime: {
            type: Date, 
            required: true, 
        }, 
        endDateTime: {
            type: Date, 
            required: true
        }, 
        duration: {
            type: Number, 
            required: true, 
            default: 0
        }, 
        comments: {
            type: String
        }
    }], 
    timesheetStatus: {
        type: String, 
        required: true, 
        default: 'open'
    }
}, {
    timestamps: true
})

const Timesheet = mongoose.model('Timesheet', timesheetSchema)

module.exports = Timesheet