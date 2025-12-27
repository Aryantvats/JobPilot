import express from "express";
import { getInternshalaJobDetail, getInternshalaJobs, scrapeAndStoreInternshalaJobs} from "../controllers/internshallaController.js";
import { protect } from "../middleware/auth.js";

const jobRoutes = express.Router();


jobRoutes.get("/", protect,getInternshalaJobs);
jobRoutes.get("/detail",protect, getInternshalaJobDetail);

jobRoutes.post("/internal/scrape", async (req, res) => {
  await scrapeAndStoreInternshalaJobs(req.body);
  res.json({ success: true });
});
export default jobRoutes;
