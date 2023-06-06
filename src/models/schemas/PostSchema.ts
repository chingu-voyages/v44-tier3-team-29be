import { Schema } from 'mongoose'
import DB from '../../libs/DB'

interface IPost {
  title: string
  location: string
  short_description: string
  tags: string[]
  image: string
  long_description: string
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  shDesc: { type: String, required: true },
  tags: [{ type: String, required: true }],
  image: { type: String, required: false },
  lgDesc: { type: String, required: false }
})

PostSchema.set('timestamps', true)

export const Post = DB.model<IPost>('Post', PostSchema)
