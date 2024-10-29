import express from "express";
import {
    getStandarDK,
    putStandarDK,
} from "../controllers/standardsController.js";

const router = express.Router();

router.get("/DK", getStandarDK);
router.put("/DK", putStandarDK);

export default router;
