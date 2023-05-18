import { Router } from 'express'
import * as controller from '../controllers/index'
import { postRouter } from './Post'

export const router = Router()

router.get('/', controller.index)

// Post routes
router.use('/post', postRouter)
