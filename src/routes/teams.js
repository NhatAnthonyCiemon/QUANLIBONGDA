import express from "express";
import {
    getTeams,
    getTeamById,
    createTeam,
} from "../controllers/teamsController.js";

const router = express.Router();

router.post("/create", createTeam);
router.get("/:id", getTeamById);
router.get("/", getTeams);

export default router;
