const mongoose = require('mongoose') 

const timeEntrySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    }, 
    task: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Task',
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
    }, 
    entryStatus: {
        type: String,
        required: true, 
        default: 'pending' 
    },
}, {
    timestamps: true
})


const TimeEntry = mongoose.model('TimeEntry', timeEntrySchema)

module.exports = TimeEntry
