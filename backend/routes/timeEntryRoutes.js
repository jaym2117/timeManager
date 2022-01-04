const express = require('express')
const router = express.Router()
const {
    getAllTimeEntries, 
    getTimeEntryById, 
    getMyDailyTimeEntries,
    deleteTimeEntry, 
    createTimeEntry, 
    updateTimeEntry
} = require('../controllers/timeEntryController.js')
const {protect, admin} = require('../middleware/authMiddleware.js')

router
    .route('/')
    .get(getAllTimeEntries, protect, admin)
    .post(createTimeEntry, protect)

router
    .route('/:id')
    .get(getTimeEntryById, protect)
    .delete(deleteTimeEntry, protect)
    .put(updateTimeEntry, protect)

router
    .route('/:id/:date')
    .get(getMyDailyTimeEntries, protect)

module.exports = router