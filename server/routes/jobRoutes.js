import express from "express";
import { scrapeInternshalaJobs } from "../services/jobsScrapper.js";

const jobRoutes = express.Router();

jobRoutes.get('/',async (req, res) => {
  try {
    const { category, location ,remote} = req.query;
    const jobs = await scrapeInternshalaJobs(category, location, remote);
    res.json({ success: true, jobs });
  } catch (err) {
    console.error("Scraping failed:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
});

export default jobRoutes;