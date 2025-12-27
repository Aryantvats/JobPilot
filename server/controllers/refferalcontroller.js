import Career from "../models/career.js";
import Profile from "../models/Profile.js";
import { generateReferralMessage } from "../services/refferalService.js";

export const generateReferral = async (req, res) => {
  try {
    const { jobId, url } = req.body;

    let job = null;

    if (jobId) {
      job = await Career.findById(jobId);
    }

    if (!job && url) {
      job = await Career.findOne({ link: url });
    }

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const profile = await Profile.findOne({ userId: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const messages = await generateReferralMessage({
      job,
      profile,
    });

    res.json({
      success: true,
      messages,
    });
  } catch (err) {
    console.error("Referral generation error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate referral",
    });
  }
};
