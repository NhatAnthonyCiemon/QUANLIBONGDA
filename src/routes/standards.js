import express from "express";
import {
    getStandarDK,
    putStandarDK,
    putStandarDK1,
} from "../controllers/standardsController.js";

const router = express.Router();

router.get("/DK", getStandarDK);
router.put("/DK", putStandarDK);
router.put("/DK1", putStandarDK1);

export default router;
