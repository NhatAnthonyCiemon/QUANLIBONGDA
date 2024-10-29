import express from 'express';
import { getPlayers, getPlayerById, createPlayer } from '../controllers/playersController.js';

const router = express.Router();

router.get('/', getPlayers);
router.get('/:id', getPlayerById);
router.post('/', createPlayer);

export default router;