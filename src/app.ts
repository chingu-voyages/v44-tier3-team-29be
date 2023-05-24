import express, { Request, Response } from 'express'
import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler'
import DB from './libs/DB'
import { config } from 'dotenv'

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

// Express configuration
app.set('port', process.env.PORT || 8000)

//set body parser
app.use(json())

//Set API Route
app.use('/api', router)

//error handler should handle the 400 errors and 500 errors
app.use(errorNotFoundHandler)
app.use(errorHandler)
