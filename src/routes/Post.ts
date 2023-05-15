import { Router } from 'express'
import controller from '../controllers/Post'

const router = Router()

router.post('/create', controller.createPost)
router.get('/:postID', controller.readPost)
router.get('/', controller.readAll)
router.patch('/update/:postID', controller.updatePost)
router.delete('/delete/:postID', controller.deletePost)

export = router
