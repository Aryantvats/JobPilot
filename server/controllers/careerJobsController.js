import { scrapeCareerPage, fetchJobDescription } from "../services/scrapeCareers.js";
import { careerConfigs } from "../configs/careerConfig.js";
import Career from "../models/career.js";


export const scrapeAndStoreCareerJobs = async () => {
  try {
    for (const config of careerConfigs) {
      const jobs = await scrapeCareerPage(config);

      for (const job of jobs) {
        await Career.findOneAndUpdate(
          { link: job.link },
          {
            company: config.company,
            title: job.title,
            location: job.location,
            type: job.type,
            link: job.link
          },
          { upsert: true }
        );
      }
    }

    console.log("Career jobs scraped and stored successfully");
  } catch (error) {
    console.error("Failed to scrape and store career jobs", error);
  }
};

export const getCareerJobs = async (req, res) => {
  try {
    const jobs = await Career.find(
      {},
      { title: 1, location: 1, type: 1, link: 1, company: 1 }
    ).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch career jobs"
    });
  }
};


export const getCareerJD = async (req, res) => {
    try {
        const { url, company } = req.query;

        if (!url || !company) {
            return res.status(400).json({ success: false, message: "Missing params" });
        }

        let job = await Career.findOne({ link: url });

        if (job && job.descriptionHtml) {
            return res.status(200).json({
                success: true,
                description: job.descriptionHtml,
                cached: true
            });
        }

        const config = careerConfigs.find(
            c => c.company.toLowerCase() === company.toLowerCase()
        );

        if (!config) {
            return res.status(400).json({ success: false, message: "Company not supported" });
        }

        const jd = await fetchJobDescription(url, config.descriptionSelector);

        await Career.findOneAndUpdate(
            { link: url },
            {
                descriptionHtml: jd,
                jdFetchedAt: new Date()
            },
            { upsert: true }
        );

        res.status(200).json({
            success: true,
            description: jd,
            cached: false
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch JD" });
    }
};