import express from "express";
import {
    getPlayers,
    getPlayerHasGoal,
    getTeam,
} from "../controllers/researchController.js";

const router = express.Router();

router.get("/totalplayers", getPlayers);
router.get("/playershasgoal", getPlayerHasGoal);
router.get("/team", getTeam);

export default router;
