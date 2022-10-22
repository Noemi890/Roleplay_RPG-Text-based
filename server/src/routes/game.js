import { Router } from "express";
import { validateAuth } from "../middleware/auth.js";
import { getGame } from "../controllers/game.js";

const router = Router()

router.get('/:id', validateAuth, getGame)

export default router