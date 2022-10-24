import { Router } from "express";
import { validateAuth } from "../middleware/auth.js";
import { createRole } from "../controllers/role.js";

const router = Router()

router.post('/create', validateAuth, createRole)

export default router