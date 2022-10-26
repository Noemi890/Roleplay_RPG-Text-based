import { Router } from "express";
import { createEvent } from "../controllers/event.js";
import { validateAuth } from "../middleware/auth.js";

const router = Router()

router.post('/', validateAuth, createEvent)

export default router