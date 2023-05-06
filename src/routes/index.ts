import { Router } from 'express'
import * as controller from '../controllers/index'

//authentication controller
import { registerUser, loginUser } from '../controllers/auth'

export const router = Router()

// /api/  -> default route
router.get('/', controller.index)


//  /api/auth -> auth route
router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)