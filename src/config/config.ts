import { config } from 'dotenv'
config()

const MONGODB_DBNAME = process.env.MONGODB_DBNAME || 'artemisdb'
const MONGODB_USERNAME = process.env.MONGODB_USERNAME || ''
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || ''
const MONGODB_HOST = process.env.MONGODB_HOST || ''
const SERVER_PORT = 3000
const MONGO_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}`

export const configs = {
  mongo: {
    url: MONGO_URL,
    db: MONGODB_DBNAME
  },
  server: {
    port: SERVER_PORT
  }
}
