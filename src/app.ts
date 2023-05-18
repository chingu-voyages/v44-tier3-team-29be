import express from 'express'
import * as path from 'path'

import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler'

import DbConnection from './library/db'

// connection to database
const connection = DbConnection.connect()
connection.on('connection', () => {
  console.log('connection on')
})
connection.on('error', (error) => {
  console.log('Error in DB ' + error)
})

// Routes
import { router } from './routes/index'
// Create Express server
export const app = express()

// need to use express.json to parse the json data from request
app.use(express.json())

// Express configuration
app.set('port', process.env.PORT || 3000)

app.use(express.static(path.join(__dirname, '../public')))
app.use('/', router)

app.use(errorNotFoundHandler)
app.use(errorHandler)
