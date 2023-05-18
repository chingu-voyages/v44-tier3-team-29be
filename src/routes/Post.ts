import { Router } from 'express'
import controller from '../controllers/Post'

export const postRouter = Router()

postRouter.post('/create', controller.createPost)
postRouter.get('/:postID', controller.readPost)
postRouter.get('/', controller.readAll)
postRouter.patch('/update/:postID', controller.updatePost)
postRouter.delete('/delete/:postID', controller.deletePost)
