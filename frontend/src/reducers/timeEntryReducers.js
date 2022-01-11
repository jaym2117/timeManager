import { TIME_ENTRY_CREATE_FAIL, TIME_ENTRY_CREATE_REQUEST, TIME_ENTRY_CREATE_RESET, TIME_ENTRY_CREATE_SUCCESS, TIME_ENTRY_DAILY_LIST_FAIL, TIME_ENTRY_DAILY_LIST_REQUEST, TIME_ENTRY_DAILY_LIST_RESET, TIME_ENTRY_DAILY_LIST_SUCCESS, TIME_ENTRY_DELETE_FAIL, TIME_ENTRY_DELETE_REQUEST, TIME_ENTRY_DELETE_SUCCESS, TIME_ENTRY_OPEN_FAIL, TIME_ENTRY_OPEN_REQUEST, TIME_ENTRY_OPEN_RESET, TIME_ENTRY_OPEN_SUCCESS, TIME_ENTRY_SUBMIT_FAIL, TIME_ENTRY_SUBMIT_REQUEST, TIME_ENTRY_SUBMIT_RESET, TIME_ENTRY_SUBMIT_SUCCESS} from "../constants/timeEntryConstants";


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

export const timeEntryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TIME_ENTRY_DELETE_REQUEST: 
            return {loading: true}
        case TIME_ENTRY_DELETE_SUCCESS: 
            return {loading: false, success: true}
        case TIME_ENTRY_DELETE_FAIL: 
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const timeEntrySubmitReducer = (state = {}, action) => {
    switch(action.type) {
        case TIME_ENTRY_SUBMIT_REQUEST: 
            return {
                loading: true, 
            }
        case TIME_ENTRY_SUBMIT_SUCCESS: 
            return {
                loading: false, 
                success: true
            }
        case TIME_ENTRY_SUBMIT_FAIL: 
            return {
                loading: false, 
                error: action.payload, 
            }
        case TIME_ENTRY_SUBMIT_RESET: 
            return {}
        default: 
            return state 
    }
}

export const timeEntryOpenReducer = (state = {}, action) => {
    switch(action.type) {
        case TIME_ENTRY_OPEN_REQUEST: 
            return {
                loading: true, 
            }
        case TIME_ENTRY_OPEN_SUCCESS: 
            return {
                loading: false, 
                success: true
            }
        case TIME_ENTRY_OPEN_FAIL: 
            return {
                loading: false, 
                error: action.payload, 
            }
        case TIME_ENTRY_OPEN_RESET: 
            return {}
        default: 
            return state 
    }
}