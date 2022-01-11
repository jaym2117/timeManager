import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Table, Button} from 'react-bootstrap'
import TimeEntryForm from '../components/TimeEntryForm'
import { deleteTimeEntry, getMyDailyTimesheet} from '../actions/timeEntryActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
 
const HomeScreen = () => {
    const [currDate, setCurrDate] = useState(moment())

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const userLogin = useSelector((state) =>  state.userLogin)
    const {userInfo} = userLogin 

    const timeEntryDailyTimesheet = useSelector((state) => state.timeEntryDailyTimesheet)
    const {loading, error, timeEntries, success, totalHours} = timeEntryDailyTimesheet

    const timeEntryDelete = useSelector((state) => state.timeEntryDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = timeEntryDelete


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } 
        else {
            dispatch(getMyDailyTimesheet(currDate))
        }
    }, [dispatch, navigate, userInfo, currDate, successDelete])

    const leftDate = () => {
        setCurrDate(moment(currDate).add(-1, 'd'))
    }

    const rightDate = () => {
        setCurrDate(moment(currDate).add(1, 'd'))
    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteTimeEntry(id))
        }
    }

    const submitTimeHandler = (timeEntries) => {
        
    }

    return (
        <>
            <Row>
                <h1 className='text-center'>My Daily Timesheet</h1>
            </Row>
            <Row className='mx-1'>
                <Col xs={1}>
                    <Button variant='light' onClick={leftDate}>
                        <i className="fas fa-chevron-left"></i>
                    </Button>
                </Col>
               <Col xs={10} className='text-center'>
                    <p className='h5'>{moment(currDate).format('ddd MMM DD, YYYY')}</p>
               </Col>
               <Col xs={1}>
                   <Button variant='light' onClick={rightDate}>
                        <i className="fas fa-chevron-right"></i>
                   </Button>
               </Col>
            </Row>
            <Row className="mt-5">
                <Col xs={4}>
                    <p className='h5'>Employee</p>
                    <p>{userInfo && userInfo.name}</p>
                </Col>
                <Col xs={4} className='text-center'>
                    <p className='h5'>Timesheet Status</p>
                    {
                        (!timeEntries || timeEntries.length === 0) ? (<p>Open</p>) : (timeEntries && timeEntries[0].entryStatus === 'pending') ? (<p>Open</p>) :  (<p>Submitted</p>)
                    }
                </Col>
                <Col xs={4}>
                    <p className='h5 text-end'>Hours Worked</p>
                    <p className='text-end'>{totalHours && totalHours.toFixed(2)}</p>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col xs={12} md={8}>
                    {loadingDelete && (<Loader />)}
                    {errorDelete && (<Message variant="danger">{errorDelete}</Message>)}
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
                    {timeEntries && timeEntries.length !== 0 && (
                        <Button className='btn btn-sm' variant='primary' onClick={() => submitTimeHandler(timeEntries)}>Submit</Button>
                    )}
                </Col>
                <Col xs={12} md={4}>
                    <TimeEntryForm currDate={currDate}/>
                </Col>
            </Row>
        </>
    )
}

export default HomeScreen
