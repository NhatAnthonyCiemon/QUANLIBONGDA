import express from 'express';
import {getGoals } from '../controllers/goalsController.js';

const router = express.Router();

router.get('/', getGoals);
export default router;