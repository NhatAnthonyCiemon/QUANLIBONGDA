import express from "express";
import {
    getPlayers,
    getPlayerById,
    createPlayer,
} from "../controllers/playersController.js";

const router = express.Router();

router.post("/create", createPlayer);
router.get("/:id", getPlayerById);
router.get("/", getPlayers);

export default router;
