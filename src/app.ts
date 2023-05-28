import express, { Request, Response } from 'express'
import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler'
import DB from './libs/DB'
import { config } from 'dotenv'

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

//body parser
import { json } from 'body-parser'

//dotenv
const denv = config()

//initiate DB
const mDB = DB

// Create Express server
export const app = express()

// need to use express.json to parse the json data from request
app.use(express.json())

// Express configuration
app.set('port', process.env.PORT || 8000)

//set body parser
app.use(json())

//Set API Route
app.use('/api', router)

//error handler should handle the 400 errors and 500 errors
app.use(errorNotFoundHandler)
app.use(errorHandler)
