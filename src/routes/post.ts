import { Router } from 'express'
import { postControllers } from '../controllers/post'

export const postRouter = Router()

postRouter.get('/', postControllers.readAll)
postRouter.post('/', postControllers.createPost)
postRouter.get('/:postID', postControllers.readPost)
postRouter.patch('/:postID', postControllers.updatePost)
postRouter.delete('/:postID', postControllers.deletePost)
