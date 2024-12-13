import express from "express";
import {
    getStandarDK,
    putStandarDK,
    putStandarDK1,
    getGoalTypes,
    getMaxGoalTime,
    updateGoalType,
    updateMaxGoalTime
} from "../controllers/standardsController.js";

const router = express.Router();

router.get("/DK", getStandarDK);
router.put("/DK", putStandarDK);
router.put("/DK1", putStandarDK1);
router.get("/goal_types", getGoalTypes);
router.get("/max_goal_time", getMaxGoalTime);
router.put("/update_goal", updateGoalType);
router.put("/update_time", updateMaxGoalTime);

export default router;
