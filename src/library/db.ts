import { configs } from '../config/config'
import mongoose from 'mongoose'

/* Connecto to Mongo */
const db = mongoose
  .connect(configs.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log('connected')
  })
  .catch((error) => {
    console.log(error)
  })

export default db
// connect to db
// class DB {
//   private static instance: mongoose.Connection

//   public static connect(): mongoose.Connection {
//     if (!DB.instance) {
//       DB.instance = mongoose.createConnection(configs.mongo.url)
//       console.log('DB connected')
//     }

//     return DB.instance
//   }
// }

// export default DB.connect().useDb(configs.mongo.db)
