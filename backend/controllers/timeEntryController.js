const asyncHandler = require('express-async-handler')
const TimeEntry = require('../models/timeEntryModel.js')
const moment = require('moment')

// @desc    Fetch all time entries
// @route   GET /api/timeEntries
// @access  Private/Admin
const getAllTimeEntries = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword 
        ? {
            name: {
                $regex: req.query.keyword, 
                $options: 'i',
            }, 
        } : {}

    const count = await TimeEntry.countDocuments({...keyword})
    const timeEntries = await TimeEntry.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({timeEntries, page, pages: Math.ceil(count / pageSize)})
})

// @desc    Fetch all time entries for a specific day and user
// @route   GET /api/timeEntries/:id/:date
// @access  Private
const getMyDailyTimeEntries = asyncHandler(async(req, res) => {
    const date = req.params.date
    const userId = req.params.id

    const end = moment(date).add(1, 'd').format('YYYY-MM-DD')

    const timeEntries = await TimeEntry.find()
                                            .where('user').equals(userId)
                                            .where('startDateTime').gte(date)
                                            .where('endDateTime').lt(end)
                                            .populate('task')
    
    res.json(timeEntries)
})

// @desc    Fetch a single time entry
// @route   GET /api/timeEntries/:id
// @access  Private
const getTimeEntryById = asyncHandler(async (req, res) => {
    const timeEntry = await TimeEntry.findById(req.params.id)

    if (timeEntry) {
        res.json(timeEntry)
    } else {
        res.status(404)
        throw new Error('Time Entry not found')
    }
})

// @desc    Delete a time entry
// @route   DELETE /api/timeEntries/:id
// @access  Private
const deleteTimeEntry = asyncHandler(async(req, res) => {
    const timeEntry = await TimeEntry.findById(req.params.id)

    if (timeEntry) {
        await timeEntry.remove()
        res.json({message: 'Time entry removed'})
    } else {
        res.status(404)
        throw new Error('Time Entry not found')
    }
})

// @desc    Create a time entry 
// @route   POST /api/timeEntries
// @access  Private
const createTimeEntry = asyncHandler(async(req, res) => {
    const timeEntry = new TimeEntry({
        user: req.body.user, 
        task: req.body.task, 
        startDateTime: req.body.startDateTime, 
        endDateTime: req.body.endDateTime, 
        duration: req.body.duration, 
        comments: req.body.comments
    })

    const createTimeEntry = await timeEntry.save()
    res.status(201).json(createTimeEntry)
})

// @desc    Update a time entry
// @route   PUT /api/timeEntries/:id
// @access  Private
const updateTimeEntry = asyncHandler(async (req, res) => {
    const {
        startDateTime, 
        endDateTime, 
        duration, 
        comment
    } = req.body 

    const timeEntry = await TimeEntry.findById(req.params.id)

    if (timeEntry) {
        timeEntry.startDateTime = startDateTime
        timeEntry.endDateTime = endDateTime
        timeEntry.duration = duration
        timeEntry.comment = comment

        const updatedTimeEntry = await timeEntry.save()
        res.json(updatedTimeEntry)
    } else {
        res.status(404)
        throw new Error('Time Entry not found')
    }
})

// @desc    Update a time entry's status to submitted
// @route   PUT /api/timeEntries/:id/submit
// @access  Private
const updateTimeEntryToSubmitted = asyncHandler( async (req, res) => {
    const timeEntry = await TimeEntry.findById(req.params.id)

    if (timeEntry) {
        timeEntry.entryStatus = 'submitted'
        const submittedEntry = await timeEntry.save()
        res.json(submittedEntry)
    } else {
        res.status(404)
        throw new Error('Time Entry not found')
    }
})



module.exports = {
    getAllTimeEntries, 
    getMyDailyTimeEntries, 
    getTimeEntryById, 
    deleteTimeEntry, 
    createTimeEntry, 
    updateTimeEntry, 
    updateTimeEntryToSubmitted
}