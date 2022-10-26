import { Router } from "express";
import { createProfile, getProfileById, updateGameId } from "../controllers/profile.js";
import { validateAuth } from "../middleware/auth.js";

const router = Router()

router.post('/create', createProfile)
router.get('/:id', validateAuth, getProfileById)
router.patch('/:id', validateAuth, updateGameId)

export default router