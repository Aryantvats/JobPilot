import express from "express";
import { getCareerJD, getCareerJobs } from "../controllers/CareerJobsController.js";

const careerRoutes = express.Router();

careerRoutes.get("/", getCareerJobs);
careerRoutes.get("/jd", getCareerJD);

export default careerRoutes;
