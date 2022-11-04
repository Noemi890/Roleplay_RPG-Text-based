import { Router } from 'express'
import { createUser, getUserById, getAllProfiles, getUserByIdInParam } from '../controllers/user.js'
import { validateAuth } from '../middleware/auth.js'

const router = Router()

router.post('/', createUser)
router.get('/:id', validateAuth, getUserByIdInParam)
router.get('/:id/profiles', validateAuth, getAllProfiles)
router.get('/', validateAuth, getUserById)

export default router