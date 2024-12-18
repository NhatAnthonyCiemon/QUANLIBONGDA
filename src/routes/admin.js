import express from "express";
import {
    login,
    createSchedule,
    checkNextSeason,
    createNextSeason,
} from "../controllers/adminController.js";

const router = express.Router();

router.use("/login", login);
router.use("/createSchedule/:season", createSchedule);
router.use("/checkNextSeason", checkNextSeason);
router.use("/createNextSeason", createNextSeason);

export default router;
