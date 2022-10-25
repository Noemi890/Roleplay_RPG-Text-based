import { Router } from "express";
import { createProfile } from "../controllers/profile.js";
import { validateAuth } from "../middleware/auth.js";

const router = Router()

router.post('/create', createProfile)

export default router