import { Router } from 'express'
import { postControllers } from '../controllers/post'
import { passportMiddleware } from '../libs/Passport'

export const postRouter = Router()

postRouter.get('/', postControllers.readAllPosts)
postRouter.post('/', passportMiddleware, postControllers.createPost)
postRouter.get('/:postID', passportMiddleware, postControllers.readPost)
postRouter.patch('/:postID', passportMiddleware, postControllers.updatePost)
postRouter.delete('/:postID', passportMiddleware, postControllers.deletePost)
