const asyncHandler = require('express-async-handler')
const Timesheet = require('../models/timeSheetModel.js')


// @desc    Fetch all timesheets
// @route   GET /api/timesheets
// @access  Private/Admin
const getAllTimesheets = asyncHandler(async (req, res) => {
    const pageSize = 10 
    const page = Number(req.query.pageNumber) || 1 

    const count = await Timesheet.countDocuments()
    const timesheets = await Timesheet.find().limit(pageSize).skip(pageSize * (page - 1))

    res.json({timesheets, page, pages: Math.ceil(count / pageSize)})
})

// @desc    Fetch all timesheets for a specific user 
// @route   GET /api/timesheets/:id
// @access  Private
const getMyTimesheets = asyncHandler(async(req, res) => {
    const userId = req.params.id 

    const timesheets = await Timesheet.where('user').equals(userId)

    res.json(timesheets)
})

// @desc    Fetch a single time sheet 
// @route   GET /api/timesheets/:id
// @access  Private 
const getTimesheetById = asyncHandler(async (req, res) => {
    const timesheet = await Timesheet.findById(req.params.id)

    if (timesheet) {
        res.json(timesheet)
    } else {
        res.status(404)
        throw new Error('Timesheet not found')
    }
})

// @desc    Delete a timesheet
// @route   DELETE /api/timesheet/:id
// @access  Private
const deleteTimesheet = asyncHandler(async(req, res) => {
    const timesheet = await Timesheet.findById(req.params.id)

    if (timesheet) {
        await timesheet.remove()
        res.json({message: 'Timesheet removed'})
    } else {
        res.status(404)
        throw new Error('Timesheet not found')
    }
})

// @desc    Create a timesheet 
// @route   POST /api/timesheets
// @access  Private
const createTimesheet = asyncHandler(async(req, res) => {
    const timesheet = new Timesheet({
        user: req.body.user, 
        timesheetDate: req.body.timesheetDate, 
        timeEntries: req.body.timeEntries
    })

    const createTimesheet = await timesheet.save() 
    res.status(201).json(createTimesheet)
})

// @desc    Update a timesheet 
// @route   PUT /api/timesheets/:id
// @access  Private
const updateTimesheet = asyncHandler(async (req, res) => {
    const {
        timesheetDate, 
        timeEntries
    } = req.body 

    const timesheet = await Timesheet.findById(req.params.id)

    if (timesheet) {
        timesheet.timesheetDate = timesheetDate
        timesheet.timeEntries = timeEntries

        const updatedTimesheet = await timesheet.save() 
    } else {
        res.status(404)
        throw new Error('Timesheet not found')
    }
})



module.exports = {
    getAllTimesheets, 
    getMyTimesheets, 
    getTimesheetById, 
    deleteTimesheet, 
    createTimesheet, 
    updateTimesheet
}