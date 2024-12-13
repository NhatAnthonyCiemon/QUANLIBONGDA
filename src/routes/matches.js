import express from 'express';
import {getMatches, updateMatchResult } from '../controllers/matchesController.js';

const router = express.Router();

router.get('/', getMatches);
router.put('/update-matches', updateMatchResult);
export default router;