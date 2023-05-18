import { configs } from '../config/config'
import mongoose from 'mongoose'

class DbConnection {
  private static connection: mongoose.Connection

  public static connect(): mongoose.Connection {
    if (!DbConnection.connection) {
      this.connection = mongoose.createConnection(configs.mongo.url)
      console.log('Connected To Database!')
    }

    return DbConnection.connection
  }
}

export default DbConnection
