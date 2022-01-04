import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import TimePicker from 'react-bootstrap-time-picker'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
    createTimeEntry, getMyDailyTimesheet
} from '../actions/timeEntryActions'
import {
    getAllTasks
} from '../actions/taskActions'
import { TIME_ENTRY_CREATE_RESET } from '../constants/timeEntryConstants'


const TimeEntryForm = ({currDate}) => {
    const [task, setTask] = useState('')
    const [startTime, setStartTime] = useState(18000)
    const [endTime, setEndTime] = useState(18000)
    const [duration, setDuration] = useState(0)
    const [comments, setComments] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const taskList = useSelector((state) => state.taskList)
    const {loading, error, tasks} = taskList

    const timeEntryCreate = useSelector((state) => state.timeEntryCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate} = timeEntryCreate 

    useEffect(() => {
        if (successCreate) {
            dispatch({type: TIME_ENTRY_CREATE_RESET})
            dispatch(getMyDailyTimesheet(currDate))
        } else {
            dispatch(getAllTasks()) 
        }
    }, [dispatch, successCreate, navigate, currDate])


    const submitHandler = (e) => {
        e.preventDefault() 

        if (task === '') {
            setMessage('Please choose a task')
        }

        if (duration === 0) {
            setMessage('Entry cannot be submitted with 0 hours')
        }

        if (comments === '') {
            setMessage('Please add a comment to complete the entry')
        }

        if (task !== '' && comments !== '' && duration !== 0) {
            dispatch(createTimeEntry({
                task, 
                currDate, 
                startTime, 
                endTime, 
                duration, 
                comments
            }))
            setTask('')
            setStartTime(18000)
            setEndTime(18000)
            setDuration(0)
            setComments('')
            setMessage(null)
        }
    }

    const startTimeChangeHandler = (time) => {
        if (time <= endTime) {
            console.log(time)
            setStartTime(time)
            setDuration((endTime - time) /3600)
        } else {
            setEndTime(time)
            setStartTime(time)
            setDuration(0)
        }
    }
    const endTimeChangeHandler = (time) => {
        if (time >= startTime) {
            setEndTime(time)
            setDuration((time - startTime) /3600)
        } else {
            setEndTime(time)
            setStartTime(time)
            setDuration(0)
        }
    }
    return (
        <>
            <h5>Enter Time</h5>
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='dange'>{errorCreate}</Message>}

            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : message ? <Message variant='danger'>{message}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='task'>
                        <Form.Label>Task</Form.Label>
                        <Form.Select
                            onChange={(e) => setTask(e.target.value)}
                        >
                            <option>Pick a Task...</option>
                                {tasks && tasks.map((task) => (
                                    <option key={task._id} value={task._id}>{task.taskName}</option>
                                ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='startTime'>
                        <Form.Label>Start</Form.Label>
                        <TimePicker start='5:00' end="18:00" step={15} value={startTime} onChange={(time) => startTimeChangeHandler(time)}/>
                    </Form.Group>
                    <Form.Group controlId='endTime'>
                        <Form.Label>End</Form.Label>
                        <TimePicker start='5:00' end="18:00" step={15} value={endTime} onChange={(time) => endTimeChangeHandler(time)}/>
                    </Form.Group>
                    <Form.Group controlId='duration'>
                        <Form.Label>Hours</Form.Label>
                        <Form.Control 
                            type='number'
                            value={duration}
                            disabled></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                        <Form.Label>Comments</Form.Label>
                        <Form.Control as="textarea" row={2} value={comments} onChange={(e) => setComments(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' className='my-3' variant='primary'>
                        Add Entry
                    </Button>
                </Form>  
            )}
        </>
    )
}

export default TimeEntryForm
