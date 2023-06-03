import express from 'express'
import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler'
import DB from './libs/DB'
import { config } from 'dotenv'

// Routes
import { router } from './routes/index'

//body parser
import { json } from 'body-parser'
import cors, { CorsOptions } from 'cors'

//dotenv
config()

//initiate DB
DB

// Create Express server
export const app = express()

// enable cors
const corsOptions: CorsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL
      : 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

// Express configuration
app.set('port', process.env.PORT || 8000)

//set body parser
app.use(json())

//Set API Route
app.use('/api', router)

//error handler should handle the 400 errors and 500 errors
app.use(errorNotFoundHandler)
app.use(errorHandler)
