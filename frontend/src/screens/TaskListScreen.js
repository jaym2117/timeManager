import React, {useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {Table, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
    getAllTasks, 
    deleteTask
} from '../actions/taskActions'
import { LinkContainer } from 'react-router-bootstrap'

const TaskListScreen = () => {

    const dispatch = useDispatch() 
    const navigate = useNavigate() 

    const taskList = useSelector((state) => state.taskList)
    const {loading, error, tasks} = taskList

    const taskDelete = useSelector((state) => state.taskDelete)
    const {
        loading: loadingDelete, 
        error: errorDelete, 
        success: successDelete
    } = taskDelete 

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin) {
            navigate('/login')
        } else {
            dispatch(getAllTasks())
        }
    }, [dispatch, userInfo, navigate, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteTask(id))
        }
    }

    return (
        <>
            <Row className='align-items-center d-flex justify-content-between'>
                <Col xs={10}>
                    <h1>Tasks</h1>
                </Col>
                <Col className='text-right'>
                    <Link to='/admin/taskCreate' className='btn btn-light my-3'>
                        Create New Task
                    </Link>
                </Col>
            </Row>  
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? (<Loader/>) : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Account Number</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task._id}>
                                    <td>{task.taskName}</td>
                                    <td>{task.accountNumber}</td>
                                    <td className='text-center'>
                                        <LinkContainer to={`/admin/tasks/${task._id}/edit`}>
                                            <Button variant='light' className='btn-sm m-1'>
                                                <i className='fas fa-edit'></i>        
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm m-1'
                                            onClick={() => deleteHandler(task._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    )
}

export default TaskListScreen
