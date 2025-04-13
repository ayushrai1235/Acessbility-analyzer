import express from "express";
import { analyzeWebsite } from "../controllers/analyze.controller.js";

const router = express.Router();

router.post("/", analyzeWebsite);

export default router;
