import { NextFunction, Request, Response } from 'express'
import { Post } from '../models/schemas/PostSchema'

//create post
const createPost = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    const { title, location, shDesc, tags, image, lgDesc } = req.body

    const post = new Post({
      title,
      location,
      shDesc,
      tags,
      image,
      lgDesc
    })

    const savedPost = await post.save()

    return res.status(200).json({
      message: {
        post: savedPost
      },
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
      success: false
    })
  }
}

// read post by id
const readPost = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    const postId = req.params.postID

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(500).json({
        message: 'Post does not exist.',
        success: false
      })
    }

    return res.status(200).json({
      message: {
        post: post
      },
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
      success: false
    })
  }
}

// get all posts
const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find()

    return res.status(200).json({
      message: {
        posts: posts
      },
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
      success: false
    })
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

      return res.status(200).json({
        message: {
          post: updatedPost
        },
        success: true
      })
    } else {
      return res.status(500).json({
        message: 'Post does not exist.',
        success: false
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
      success: false
    })
  }
}

// delete post by id
const deletePost = async (req: Request, res: Response, nex: NextFunction) => {
  try {
    const postId = req.params.postID

    const deletedPost = await Post.findByIdAndDelete(postId)

    if (deletedPost) {
      return res.status(200).json({
        message: {
          post: deletePost
        },
        success: true
      })
    } else {
      return res.status(500).json({
        message: 'Post does not exist.',
        success: false
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
      success: false
    })
  }
}

export const postControllers = {
  createPost,
  readPost,
  updatePost,
  deletePost,
  readAll
}
