import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Form, Button, ButtonGroup, ToggleButton} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const userRegister = useSelector((state) => state.userRegister)
    const {loading, error, success} = userRegister

    useEffect(() => {
        if (userInfo && !userInfo.isAdmin) {
            navigate('/login')   
        }

    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault() 
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password, isAdmin))
        }
    }
    return (
        <FormContainer>
            <h1>Register A New User</h1>
            {success && <Message variant='success'>User successfully added</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}    
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}    
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}    
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}    
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='toggle-check' className='my-3'>
                <ButtonGroup className='mb2'>
                    <ToggleButton
                        id='toggle-check'
                        type='checkbox'
                        variant={isAdmin ? 'primary' : 'outline-primary'}
                        checked={isAdmin}
                        value={isAdmin}
                        onChange={(e) => setIsAdmin(e.currentTarget.checked)}
                    >Admin</ToggleButton>
                </ButtonGroup>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-3'>Register</Button>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
