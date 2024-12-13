import express from 'express';
import {getGoals,updateGoalPlayerList } from '../controllers/goalsController.js';

const router = express.Router();

router.get('/', getGoals);
router.post('/update-goal', updateGoalPlayerList);
export default router;