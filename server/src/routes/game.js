import { Router } from "express";
import { validateAuth } from "../middleware/auth.js";
import { createGame, getGame, updateGamePartecipants } from "../controllers/game.js";

const router = Router()

router.get('/:id', validateAuth, getGame)
router.post('/', validateAuth, createGame)
router.patch('/:id', validateAuth, updateGamePartecipants)

export default router