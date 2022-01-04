import { TIME_ENTRY_CREATE_FAIL, TIME_ENTRY_CREATE_REQUEST, TIME_ENTRY_CREATE_RESET, TIME_ENTRY_CREATE_SUCCESS, TIME_ENTRY_DAILY_LIST_FAIL, TIME_ENTRY_DAILY_LIST_REQUEST, TIME_ENTRY_DAILY_LIST_RESET, TIME_ENTRY_DAILY_LIST_SUCCESS } from "../constants/timeEntryConstants";


export const timeEntryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case TIME_ENTRY_CREATE_REQUEST: 
            return {loading: true}
        case TIME_ENTRY_CREATE_SUCCESS: 
            return {loading: true, success: true, timeEntry: action.payload}
        case TIME_ENTRY_CREATE_FAIL: 
            return {loading: false, error: action.payload}
        case TIME_ENTRY_CREATE_RESET: 
            return {}
        default: 
            return state 
    }
}

export const timeEntryDailyTimesheetReducer = (state = {timeEntries: []}, action) => {
    switch (action.type) {
        case TIME_ENTRY_DAILY_LIST_REQUEST: 
            return {loading: true}
        case TIME_ENTRY_DAILY_LIST_SUCCESS: 
            return {loading: false, success: true, timeEntries: action.payload.timeEntries, totalHours: action.payload.totalHours}
        case TIME_ENTRY_DAILY_LIST_FAIL: 
            return {loading: false, error: action.payload}
        case TIME_ENTRY_DAILY_LIST_RESET: 
            return {}
        default: 
            return state
    }
}