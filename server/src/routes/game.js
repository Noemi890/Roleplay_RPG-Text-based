import { Router } from "express";
import { validateAuth } from "../middleware/auth.js";
import { createGame, getGame } from "../controllers/game.js";

const router = Router()

router.get('/:id', validateAuth, getGame)
router.post('/', validateAuth, createGame)

export default router