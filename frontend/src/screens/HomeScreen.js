import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Table, Button} from 'react-bootstrap'
import TimeEntryForm from '../components/TimeEntryForm'
import { deleteTimeEntry, getMyDailyTimesheet, openTimeEntries, submitTimeEntries} from '../actions/timeEntryActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import TimesheetHeader from '../components/TimesheetHeader'
 
const HomeScreen = () => {
    const [currDate, setCurrDate] = useState(moment())

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const userLogin = useSelector((state) =>  state.userLogin)
    const {userInfo} = userLogin 

    const timeEntryDailyTimesheet = useSelector((state) => state.timeEntryDailyTimesheet)
    const {loading, error, timeEntries, success} = timeEntryDailyTimesheet

    const timeEntryDelete = useSelector((state) => state.timeEntryDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = timeEntryDelete

    const timeEntrySubmit = useSelector((state) => state.timeEntrySubmit)
    const {loading: loadingSubmit, error: errorSubmit, success: successSubmit} = timeEntrySubmit

    const timeEntryOpen = useSelector((state) => state.timeEntryOpen)
    const {loading: loadingOpen, error: errorOpen, success: successOpen} = timeEntryOpen
    
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } 
        else {
            dispatch(getMyDailyTimesheet(currDate))
        }
    }, [dispatch, navigate, userInfo, currDate, successDelete, successSubmit, successOpen])

    const leftDate = () => {
        setCurrDate(moment(currDate).add(-1, 'd'))
    }

    const rightDate = () => {
        setCurrDate(moment(currDate).add(1, 'd'))
    }

    const datePicker = (newDate) => {
        setCurrDate(moment(newDate))
    }


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteTimeEntry(id))
        }
    }

    const submitTimeHandler = (timeEntries) => {
        if (window.confirm('Are you sure you want to submit your time?')) {
            timeEntries.map(timeEntry => dispatch(submitTimeEntries(timeEntry._id)))
        }   
    }

    const openTimeHandler = (timeEntries) => {
        if (window.confirm('Are you sure you want to reopen your time?')) {
            timeEntries.map(timeEntry => dispatch(openTimeEntries(timeEntry._id)))
        }
    }

    return (
        <>
            <TimesheetHeader 
                leftDate={leftDate} 
                rightDate={rightDate}
                datePicker={datePicker}
                currDate={currDate}
            />
            <hr/>
            <Row>
                <Col xs={12} md={8}>
                    {loadingDelete && (<Loader />)}
                    {loadingSubmit && (<Loader />)}
                    {loadingOpen && (<Loader />)}
                    {errorDelete && (<Message variant="danger">{errorDelete}</Message>)}
                    {errorSubmit && (<Message variant="danger">{errorSubmit}</Message>)}
                    {errorOpen && (<Message variant="danger">{errorOpen}</Message>)}
                    {loading ? (<Loader />) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Duration</th>
                                    <th>Comments</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {success && timeEntries.map(timeEntry => (
                                    <tr key={timeEntry._id}>
                                        <td>{timeEntry.task.taskName}</td>
                                        <td>{moment(timeEntry.startDateTime).format("HH:mm A")}</td>
                                        <td>{moment(timeEntry.endDateTime).format("HH:mm A")}</td>
                                        <td>{timeEntry.duration.toFixed(2)}</td>
                                        <td>{timeEntry.comments}</td>
                                        <td className='text-center'>
                                            {timeEntry.entryStatus === 'pending' ? (
                                                <Button
                                                    variant='danger'
                                                    className='btn-sm'
                                                    onClick={() => deleteHandler(timeEntry._id)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            ) : (
                                                <i className='fas fa-lock'></i>
                                            )}
                                        </td>
                                    </tr> 
                                ))}
                            </tbody>
                        </Table>
                    )}
                    {(!timeEntries || timeEntries.length === 0) ? null : (timeEntries && timeEntries.length !== 0 && timeEntries[0].entryStatus === 'pending') ? (
                        <Button className='btn btn-sm' variant='primary' onClick={() => submitTimeHandler(timeEntries)}>Submit</Button>
                    ) : (
                        <Button className='btn btn-sm' variant='success' onClick={() => openTimeHandler(timeEntries)}>Open</Button>
                    )}
                </Col>
                {(!timeEntries || timeEntries.length === 0) ? (
                    <Col xs={12} md={4}>
                        <TimeEntryForm currDate={currDate}/>
                    </Col>
                ) : (timeEntries && timeEntries.length !== 0 && timeEntries[0].entryStatus === 'pending') ? (
                    <Col xs={12} md={4}>
                        <TimeEntryForm currDate={currDate}/>
                    </Col>
                ) : null}
                
            </Row>
        </>
    )
}

export default HomeScreen
