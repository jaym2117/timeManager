import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getTaskById, updateTask } from '../actions/taskActions'
import { TASK_UPDATE_RESET } from '../constants/taskConstants'

const TaskEditScreen = () => {
    const params = useParams()
    const navigate = useNavigate() 
    const dispatch = useDispatch() 

    const taskId = params.id 

    const [taskName, setTaskName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin 

    const taskDetails = useSelector((state) => state.taskDetails)
    const {loading, error, task} = taskDetails

    const taskUpdate = useSelector((state) => state.taskUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = taskUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: TASK_UPDATE_RESET})
            navigate('/admin/taskList')
        } else {
            if (!userInfo || !userInfo.isAdmin) {
                navigate('/login')
            }
            else if (!task.taskName || task._id !==  taskId) {
                dispatch(getTaskById(taskId))
            } else {
                setTaskName(task.taskName)
                setAccountNumber(task.accountNumber)
            }
        }
    }, [dispatch, navigate, successUpdate, task, taskId, userInfo])

    const submitHandler = (e) => {
        e.preventDefault() 
        dispatch(updateTask({_id: taskId, taskName, accountNumber}))
    }

    return (
        <>
            <Link to='/admin/taskList' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Task</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='dangee'>{errorUpdate}</Message>}
                {loading ? (<Loader />) : error ? (<Message variant='danger'>{errorUpdate}</Message>) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='taskName'>
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter task name'
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='accountNumber'>
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter account number'
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' className='my-3'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default TaskEditScreen
