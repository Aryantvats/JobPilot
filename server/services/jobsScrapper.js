import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

export const scrapeInternshalaJobs = async (category , location , remote) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  // Build dynamic Internshala URL
  let url = `https://internshala.com/internships/`;
  if (remote === "true") {
    url += "work-from-home-";
  }

  url += `${category}-internship`;

  if (location) {
    url += `-in-${location}`;
  }

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  await page.waitForSelector("#list_container .individual_internship");

  const jobHandles = await page.$$("#list_container .individual_internship");

  const jobs = [];

  for (const jobHandle of jobHandles) {
    try {
      const title = await jobHandle.$eval(".job-title-href", el => el.textContent.trim());
      const company = await jobHandle.$eval(".company-name", el => el.textContent.trim());
      const locationText = await jobHandle.$eval(".locations", el => el.textContent.trim());
      const stipend = await jobHandle.$eval(".stipend", el => el.textContent.trim());
      const duration = await jobHandle.$eval(".row-1-item:nth-of-type(3) span", el => el.textContent.trim());
      const description = await jobHandle.$eval(".about_job", el => el.textContent.trim());
      const posted = await jobHandle.$eval(".status-success, .status-info, .status-warning, .status-inactive", el => el.textContent.trim());
      const link = await jobHandle.$eval(".job-title-href", el => el.href);

      jobs.push({ title, company, location: locationText, stipend, duration, description, posted, link });
    } catch (err) {
      console.log("Some field missing:", err.message);
    }
  }

  await browser.close();
  return jobs;
};

export async function scrapeInternshalaJobDetail(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let jobDetail = {};

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector(".detail_view");

    jobDetail.title = await page.$eval(".profile", el => el.textContent.trim());
    jobDetail.company = await page.$eval(".company_name .company_and_premium a", el => el.textContent.trim());
    jobDetail.location = await page.$eval("#location_names span", el => el.textContent.replace(/\s+/g, ""));
    jobDetail.startDate = await page.$eval(".other_detail_item_row span", el => el.textContent.trim());
    jobDetail.duration = await page.$eval(".other_detail_item .item_body", el => el.textContent.trim());
    jobDetail.stipend = await page.$eval(".stipend_container .item_body .stipend", el => el.textContent.trim());
    jobDetail.applyBy = await page.$eval(".apply_by .item_body", el => el.textContent.trim());
    jobDetail.posted = await page.$eval(".status-container .status", el => el.textContent.trim());
    jobDetail.jobOffer = await page.$eval(".ppo_status", el => el.textContent.trim());
    jobDetail.applicants = await page.$eval(".applications_message_container .applications_message", el => el.textContent.trim());
    jobDetail.details = await page.$eval(".internship_details .text-container", el => el.textContent.trim());
    jobDetail.skills = await page.$eval(".internship_details .skills_heading + .round_tabs_container", el => el.textContent.trim());
    jobDetail.whoCanApply = await page.$eval(".internship_details .who_can_apply", el => el.textContent.trim());
    jobDetail.perks = await page.$eval(".internship_details .perks_heading + .round_tabs_container", el => el.textContent.trim());
    jobDetail.additionalContainer = await page.$eval(".additional_detail", el => el.textContent.trim());
    jobDetail.websiteLink = await page.$eval(".internship_details .website_link a", el => el.getAttribute("href"));
    jobDetail.openings = await page.$eval("div.internship_details > div:nth-child(13)", el => el.textContent.trim());
    jobDetail.aboutCompany = await page.$eval(".internship_details .about_company_text_container", el => el.textContent.trim());

  } catch (err) {
    console.error("❌ Error scraping job details:", err.message);
  } finally {
    await browser.close();
  }

  return jobDetail;
}