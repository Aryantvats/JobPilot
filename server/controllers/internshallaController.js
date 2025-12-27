import Jobs from "../models/Jobs.js";
import { scrapeInternshalaJobs } from "../services/jobsScrapper.js";
import { scrapeInternshalaJobDetail } from "../services/jobsScrapper.js";

export const scrapeAndStoreInternshalaJobs = async ({
  category,
  location,
  remote
}) => {
  try {
    const jobs = await scrapeInternshalaJobs(category, location, remote);

    for (const job of jobs) {
      await Jobs.findOneAndUpdate(
        { link: job.link },
        {
          title: job.title,
          company: job.company,
          location: job.location,
          duration: job.duration,
          stipend: job.stipend,
          posted: job.posted,
          category,
          remote
        },
        { upsert: true }
      );
    }

    console.log("Internshala jobs stored", jobs);
  } catch (err) {
    console.error("Internshala scrape failed", err.message);
  }
};

export const getInternshalaJobs = async (req, res) => {
  try {
    const { category, location, remote } = req.query;

    const filter = {};

    if (category) filter.category = category;

    if (location) {
      filter.location = new RegExp(location, "i");
    }

    if (remote !== undefined) {
      filter.remote = remote === "true";
    }

    const jobs = await Jobs.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Internshala jobs"
    });
  }
};


export const getInternshalaJobDetail = async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL required"
      });
    }

    const job = await Jobs.findOne({ link: url });

    if (job?.descriptionHtml) {
      return res.json({
        success: true,
        job,
        cached: true
      });
    }

    const jobDetail = await scrapeInternshalaJobDetail(url);

    if (!jobDetail?.descriptionHtml) {
      return res.status(500).json({
        success: false,
        message: "Failed to scrape job description"
      });
    }

    await Jobs.findOneAndUpdate(
      { link: url },
      { descriptionHtml: jobDetail.descriptionHtml },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      job: {
        link: url,
        descriptionHtml: jobDetail.descriptionHtml
      },
      cached: false
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch job detail"
    });
  }
};


