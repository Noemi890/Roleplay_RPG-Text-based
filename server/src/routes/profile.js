import { Router } from "express";
import { createProfile, getProfileById } from "../controllers/profile.js";
import { validateAuth } from "../middleware/auth.js";

const router = Router()

router.post('/create', createProfile)
router.get('/:id', validateAuth, getProfileById)

export default router