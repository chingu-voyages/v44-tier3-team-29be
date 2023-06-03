import { NextFunction, Request, Response } from 'express'
import { Post } from '../models/schemas/PostSchema'

//create post
const createPost = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    const {
      title,
      location,
      short_description,
      tags,
      image,
      long_description
    } = req.body

    const post = new Post({
      title,
      location,
      short_description,
      tags,
      image,
      long_description
    })

    const savedPost = await post.save()

    return res.status(201).json({ savedPost })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

// read post by id
const readPost = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    const postId = req.params.postID

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ error: 'Post Not found' })
    }

    return res.json({ post })
  } catch (error) {
    return nex(error)
  }
}

// get all posts
const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find()
    return res.status(200).json({ posts })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

// update post by id
const updatePost = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    const postId = req.params.postID

    const post = await Post.findById(postId)

    if (post) {
      post.set(req.body)

      const updatedPost = await post.save()

      return res.status(201).json({ post: updatedPost })
    } else {
      return res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}

// delete post by id
const deletePost = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    const postId = req.params.postID

    const deletedPost = await Post.findByIdAndDelete(postId)

    if (deletedPost) {
      return res.status(201).json({ post: deletedPost, message: 'Deleted' })
    } else {
      return res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export default { createPost, readPost, updatePost, deletePost, readAll }
