import { Router } from 'express'
import { createUser } from '../controllers/user.js'
import { validateAuth } from '../middleware/auth.js'

const router = Router()

router.post('/', createUser)

export default router