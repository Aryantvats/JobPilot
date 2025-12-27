import express from "express";
import { protect } from "../middleware/auth.js";
import { generateReferral } from "../controllers/refferalcontroller.js";

const refferalRoutes = express.Router();

refferalRoutes.post("/generate",protect, generateReferral);

export default refferalRoutes;