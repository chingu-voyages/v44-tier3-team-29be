import express from 'express'
import * as path from 'path'

import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler'

// Routes
import { router } from './routes/index'
// Create Express server
export const app = express()

// Express configuration
app.set('port', process.env.PORT || 8000)

app.use(express.static(path.join(__dirname, '../public')))
app.use('/', router)

app.use(errorNotFoundHandler)
app.use(errorHandler)
