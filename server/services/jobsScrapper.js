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
      const posted = await jobHandle.$eval(".status-success, .status-info, .status-warning", el => el.textContent.trim());
      const link = await jobHandle.$eval(".job-title-href", el => el.href);

      jobs.push({ title, company, location: locationText, stipend, duration, description, posted, link });
    } catch (err) {
      console.log("Some field missing:", err.message);
    }
  }

  await browser.close();
  return jobs;
};
