import { Router } from "express";
import { validateAuth } from "../middleware/auth.js";
import { createRole, getRole } from "../controllers/role.js";

const router = Router()

router.post('/create', validateAuth, createRole)
router.get('/:id', validateAuth, getRole)

export default router