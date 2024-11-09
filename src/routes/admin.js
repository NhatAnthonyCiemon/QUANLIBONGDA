import express from "express";
import {
    login,
    createSchedule,
    checkNextSeason,
} from "../controllers/adminController.js";

const router = express.Router();

router.use("/login", login);
router.use("/createSchedule/:season", createSchedule);
router.use("/checkNextSeason", checkNextSeason);

export default router;
