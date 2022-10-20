import { Router } from 'express'
import { createUser, checkEmailExisting } from '../controllers/user.js'
import { validateAuth } from '../middleware/auth.js'

const router = Router()

router.post('/', createUser)
router.post('/check', checkEmailExisting)

export default router