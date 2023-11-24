import express from "express";
const router = express.Router();

import { extractColor } from "../controller/getColorController.js";

router.post("/getExtractColor", extractColor);

export default router;
