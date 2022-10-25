import { Router } from 'express'
import { createUser, getUserById, getAllProfiles } from '../controllers/user.js'
import { validateAuth } from '../middleware/auth.js'

const router = Router()

router.post('/', createUser)
router.get('/user/:id/profiles', validateAuth, getAllProfiles)
router.get('/', validateAuth, getUserById)

export default router