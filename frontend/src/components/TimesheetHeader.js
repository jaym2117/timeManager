import React from 'react'
import moment from 'moment'
import {useSelector} from 'react-redux'
import {Row, Col, Button} from 'react-bootstrap'

import DatePickerModal from '../components/DatePickerModal'

const TimesheetHeader = ({
    leftDate, 
    rightDate, 
    currDate, 
    datePicker
}) => {
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const timeEntryDailyTimesheet = useSelector((state) => state.timeEntryDailyTimesheet)
    const {totalHours, timeEntries} = timeEntryDailyTimesheet
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
                    <DatePickerModal 
                        datePicker={datePicker}
                        currDate={currDate}
                    />
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
                        (!timeEntries || timeEntries.length === 0) ? (<p>Open</p>) : (timeEntries && timeEntries[0].entryStatus === 'pending') ? (<p>Open</p>) :  (<p className='text-primary font-weight-bold'>Submitted</p>)
                    }
                </Col>
                <Col xs={4}>
                    <p className='h5 text-end'>Hours Worked</p>
                    <p className='text-end'>{totalHours && totalHours.toFixed(2)}</p>
                </Col>
            </Row>
        </>
    )
}

export default TimesheetHeader
