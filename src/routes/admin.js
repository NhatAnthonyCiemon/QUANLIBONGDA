import express from "express";
import { login } from "../controllers/adminController.js";

const router = express.Router();

router.use("/login", login);

export default router;
