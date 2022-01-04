// import path from 'path'
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const {notFound, errorHandler} = require('./middleware/errorMiddleware.js')
const connectDB = require('./config/db.js')

// ROUTES
const userRoutes = require('./routes/userRoutes.js')
const timeEntryRoutes = require('./routes/timeEntryRoutes.js')
const taskRoutes = require('./routes/taskRoutes.js')

dotenv.config()

connectDB() 

const app = express() 

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/timeEntries', timeEntryRoutes)
app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
    res.send('API is running....')
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)