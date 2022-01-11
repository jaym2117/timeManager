import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
  } from './reducers/userReducers'

  import {
      taskListReducer,
      taskDetailsReducer, 
      taskCreateReducer, 
      taskDeleteReducer, 
      taskUpdateReducer
  } from './reducers/taskReducers'

  import {
      timeEntryCreateReducer, 
      timeEntryDeleteReducer, 
      timeEntryDailyTimesheetReducer,
  } from './reducers/timeEntryReducers'

const reducer = combineReducers({
    taskList: taskListReducer, 
    taskDetails: taskDetailsReducer, 
    taskCreate: taskCreateReducer, 
    taskUpdate: taskUpdateReducer, 
    taskDelete: taskDeleteReducer, 
    timeEntryCreate: timeEntryCreateReducer, 
    timeEntryDelete: timeEntryDeleteReducer, 
    timeEntryDailyTimesheet: timeEntryDailyTimesheetReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store