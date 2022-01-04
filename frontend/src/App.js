import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
// Components
import Header from './components/Header'
// Screens
import LoginScreen  from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import TaskListScreen from './screens/TaskListScreen'
import TaskCreateScreen from './screens/TaskCreateScreen'
import TaskEditScreen from './screens/TaskEditScreen'

const App = () => {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen/>}/>
            <Route path='/profile' element={<ProfileScreen/>}/>
            <Route path='/admin/userlist' element={<UserListScreen />}/>
            <Route path='/admin/register' element={<RegisterScreen />}/>
            <Route path='/admin/user/:id/edit' element={<UserEditScreen/>} />
            <Route path='/admin/taskList' element={<TaskListScreen />} />
            <Route path='/admin/taskCreate' element={<TaskCreateScreen />} />
            <Route path='/admin/tasks/:id/edit' element={<TaskEditScreen />} /> 
            <Route path='/' element={<HomeScreen />} exact/>
          </Routes>
        </Container>
      </main>
    </Router>
  )
}

export default App