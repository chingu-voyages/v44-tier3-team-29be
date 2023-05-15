import { model, Schema } from 'mongoose'

interface IPost {
  title: string
  description: string
  created_at: Date
  //created_by?: string;
  //location: srting
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
})

export const Post = model<IPost>('Post', PostSchema)
