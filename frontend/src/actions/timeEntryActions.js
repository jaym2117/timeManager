import axios from 'axios'
import moment from 'moment'
import { TIME_ENTRY_CREATE_FAIL, TIME_ENTRY_CREATE_REQUEST, TIME_ENTRY_CREATE_SUCCESS, TIME_ENTRY_DAILY_LIST_FAIL, TIME_ENTRY_DAILY_LIST_REQUEST, TIME_ENTRY_DAILY_LIST_SUCCESS } from '../constants/timeEntryConstants'
import { logout } from './userActions'


export const createTimeEntry = (timeEntry) => async (dispatch, getState) => {
    const year = timeEntry.currDate.format('YYYY')
    const mth = timeEntry.currDate.month()
    const day = timeEntry.currDate.format('DD')
    const startTimeHRS = Math.floor(timeEntry.startTime / 3600)
    const startTimeMins = ((timeEntry.startTime / 3600) - startTimeHRS) * 60 
    const endTimeHRS = Math.floor(timeEntry.endTime / 3600)
    const endTimeMins = ((timeEntry.endTime / 3600) - endTimeHRS) * 60

    let startDateTime = new Date(year, mth, day, startTimeHRS, startTimeMins)
    let endDateTime = new Date(year, mth, day, endTimeHRS, endTimeMins)

    startDateTime = moment(startDateTime).format('YYYY-MM-DD hh:mm')
    endDateTime = moment(endDateTime).format('YYYY-MM-DD hh:mm')
    try {
        
        dispatch({
            type: TIME_ENTRY_CREATE_REQUEST
        })

        const {
            userLogin: {userInfo}, 
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/timeEntries`, {
            user: userInfo._id, 
            task: timeEntry.task, 
            duration: timeEntry.duration, 
            comments: timeEntry.comments, 
            startDateTime, 
            endDateTime
        }, config)
           
        dispatch({
            type: TIME_ENTRY_CREATE_SUCCESS, 
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }

        dispatch({
            type: TIME_ENTRY_CREATE_FAIL, 
            payload: message
        })
    }    
}


export const getMyDailyTimesheet = (date) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TIME_ENTRY_DAILY_LIST_REQUEST 
        })

        const {
            userLogin: {userInfo}, 
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/timeEntries/${userInfo._id}/${moment(date).format('YYYY-MM-DD')}`, config)
        const totalHours = await data.length === 0 ? 0 : data.map(d => d.duration).reduce((a, b) => a + b)

        dispatch({
            type: TIME_ENTRY_DAILY_LIST_SUCCESS, 
            payload: {
                timeEntries: data, 
                totalHours
            }
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        console.log(error)
        dispatch({
            type: TIME_ENTRY_DAILY_LIST_FAIL, 
            payload: message
        })
    }
}