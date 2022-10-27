import { Router } from "express";
import { createProfile, getAllPlatformProfiles, getProfileById, updateGameId } from "../controllers/profile.js";
import { validateAuth } from "../middleware/auth.js";

const router = Router()

router.post('/create', createProfile)
router.get('/:id', validateAuth, getProfileById)
router.patch('/:id', validateAuth, updateGameId)
router.get('/', validateAuth, getAllPlatformProfiles)

export default router