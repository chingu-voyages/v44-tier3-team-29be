import { Schema } from 'mongoose'
import DbConnection from '../../library/db'

const conn = DbConnection.connect()

interface IPost {
  title: string
  location: string
  short_description: string
  tags: string
  image: string
  long_description: string
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  short_description: { type: String, required: true },
  tags: { type: String, required: true },
  image: { type: String, required: true },
  long_description: { type: String, required: true }
})

PostSchema.set('timestamps', true)

export const Post = conn.model<IPost>('Post', PostSchema)
