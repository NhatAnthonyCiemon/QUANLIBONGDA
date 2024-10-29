import express from 'express';
import { getTeams,getTeamById,createTeam } from '../controllers/teamsController.js';

const router = express.Router();

router.get('/', getTeams);
router.get('/:id', getTeamById);
router.post('/', createTeam);

export default router;