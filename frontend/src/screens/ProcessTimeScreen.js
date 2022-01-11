import React, {useState, useEffect} from 'react'
import moment from 'moment'
import {Row, Col, Button, Form} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'


const ProcessTimeScreen = () => {
    const [startDate, setStartDate] = useState(moment().add(-14, 'd'))
    const [endDate, setEndDate] = useState(moment())

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && !userInfo.isAdmin) {
            navigate('/login')
        }
    }, [navigate, userInfo])
    return (
        <>
            <Row>
                <h1 className="text-center">Process Time</h1>
            </Row>
            <Row className="mx-1">
                <Col xs={6}>
                    <Form.Group controlId="startDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(moment(e.target.value))}
                        ></Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}

export default ProcessTimeScreen
