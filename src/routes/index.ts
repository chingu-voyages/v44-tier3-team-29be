import { NextFunction, Request, Response, Router } from 'express'
import * as controller from '../controllers/index'

//authentication controller
import { registerUser, loginUser } from '../controllers/auth'

//passport
import passport from '../libs/Passport'
const passportMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('jwt', { session: false })(req, res, next)
}

export const router = Router()

// /api/  -> default route
router.get('/', controller.index)

//  /api/auth -> auth route
router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)

//authenticated routes
router.get('/getAllPosts', passportMiddleware, (req, res) => {
  //test return
  return res.status(200).json({
    message: 'validated',
    success: true
  })
})
