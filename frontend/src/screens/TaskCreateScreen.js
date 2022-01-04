import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {createTask} from '../actions/taskActions'
import { TASK_CREATE_RESET } from '../constants/taskConstants'
 
const TaskCreateScreen = () => {
    const dispatch = useDispatch() 
    const navigate = useNavigate() 

    const [taskName, setTaskName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const taskCreate = useSelector((state) => state.taskCreate)
    const {loading, error, success} = taskCreate

    useEffect(() => {
        dispatch({type: TASK_CREATE_RESET})

        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login')
        }

        if (success) {
            navigate('/admin/taskList')
        } 
    }, [dispatch, userInfo, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createTask({taskName, accountNumber}))
    }

    return (
        <>
            <Row>
                <Col className='text-left'>
                    <Link to='/admin/taskList' className='btn btn-light my-3'>
                        Go Back
                    </Link>
                </Col>
            </Row>
            <FormContainer>
                <h1>Create Task</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='taskName'>
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control 
                            type='text'
                            placehodler='Enter task name'
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control 
                            type='text'
                            placehodler='Enter account number'
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='my-3'>Create</Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default TaskCreateScreen
