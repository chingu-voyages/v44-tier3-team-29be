import express from 'express'
import * as path from 'path'

import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler'

import { DB } from './library/db'

const mdb = DB

// Routes
import { router } from './routes/index'
import postRouter from './routes/Post'
// Create Express server
export const app = express()

// need to use express.json to parse the json data from request
app.use(express.json())

// Express configuration
app.set('port', process.env.PORT || 3000)

app.use(express.static(path.join(__dirname, '../public')))
app.use('/', router)

// Post routes
app.use('/post', postRouter)

app.use(errorNotFoundHandler)
app.use(errorHandler)
