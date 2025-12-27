import express from "express";
import { getCareerJD, getCareerJobs } from "../controllers/CareerJobsController.js";
import { protect } from "../middleware/auth.js";

const careerRoutes = express.Router();

careerRoutes.get("/",protect, getCareerJobs);
careerRoutes.get("/jd",protect, getCareerJD);

export default careerRoutes;
