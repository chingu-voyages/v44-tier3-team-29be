import { Router } from 'express'
import controller from '../controllers/post'

export const postRouter = Router()

postRouter.get('/', controller.readAll)
postRouter.post('/', controller.createPost)
postRouter.get('/:postID', controller.readPost)
postRouter.patch('/:postID', controller.updatePost)
postRouter.delete('/:postID', controller.deletePost)
