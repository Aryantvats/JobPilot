import express from "express";
import { scrapeInternshalaJobDetail, scrapeInternshalaJobs } from "../services/jobsScrapper.js";

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

jobRoutes.get("/detail", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ success: false, message: "Job URL is required" });
    }

    const jobDetail = await scrapeInternshalaJobDetail(url);
    res.json({ success: true, job: jobDetail });
  } catch (err) {
    console.error("Job detail scraping failed:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch job details" });
  }
});

export default jobRoutes;