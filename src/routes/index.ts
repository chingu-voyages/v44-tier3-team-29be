import { Router } from 'express'
import * as controller from '../controllers/index'

export const router = Router()

router.get('/', controller.index)
