import { Router } from "express";
import { createProfile } from "../controllers/profile.js";

const router = Router()

router.post('/create', createProfile)

export default router