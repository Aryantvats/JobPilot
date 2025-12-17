import express from "express";
import { generateReferralMessage } from "../services/refferalService.js";

const refferalRoutes = express.Router();

refferalRoutes.post("/generate", async (req, res) => {
    try {
        const { job, profile } = req.body;

        if (!job || !profile) {
            return res.status(400).json({ success: false });
        }

        const messages = await generateReferralMessage({
            job,
            profile
        });

        res.status(200).json({
            success: true,
            messages
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export default refferalRoutes;