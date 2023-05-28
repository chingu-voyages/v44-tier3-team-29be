import mongoose from 'mongoose'
import { config } from 'dotenv'
const denv = config()

const dbName = process.env.MONGODB_DBNAME || 'artemis'
const dbUser = process.env.MONGODB_USER || 'root'
const dbPwd = process.env.MONGODB_PASSWORD || 'artemis'
const dbHost = process.env.MONGODB_HOST || 'localhost:27017'

class DB {
  private static instance: mongoose.Connection

  public static connect(): mongoose.Connection {
    if (!DB.instance) {
      DB.instance = mongoose.createConnection(
        `mongodb+srv://${dbUser}:${dbPwd}@${dbHost}`
      )
      console.log('DB connected')
    }

    return DB.instance
  }
}

export default DB.connect().useDb(dbName)
