import { scrapeCareerPage, fetchJobDescription } from "../services/scrapeCareers.js";
import { careerConfigs } from "../configs/careerConfig.js";
import Career from "../models/career.js";

export const getCareerJobs = async (req, res) => {
    try {
        const results = [];

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

            results.push({
                company: config.company,
                total: jobs.length,
                jobs: jobs.map(job => ({
                    title: job.title,
                    location: job.location,
                    link: job.link
                }))
            });
        }

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to scrape career pages" });
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