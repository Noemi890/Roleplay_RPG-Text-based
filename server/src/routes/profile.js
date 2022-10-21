import { Router } from "express";
import { createProfile, getAll } from "../controllers/profile.js";
import { validateAuth } from "../middleware/auth.js";

const router = Router()

router.get('/', validateAuth, getAll)
router.post('/create', createProfile)

export default router