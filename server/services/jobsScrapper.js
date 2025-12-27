import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

export const scrapeInternshalaJobs = async (category, location, remote) => {
  category = category?.toLowerCase().replace(/\s+/g, "-");
  location = location?.toLowerCase().replace(/\s+/g, "-");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  let url = `https://internshala.com/internships/`;
  if (remote === "true") url += "work-from-home-";
  url += `${category}-internship`;
  if (location) url += `-in-${location}`;

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("#list_container .individual_internship");

  const jobs = await page.evaluate(() => {
    const cards = document.querySelectorAll("#list_container .individual_internship");
    const results = [];

    cards.forEach(card => {
      try {
        results.push({
          title: card.querySelector(".job-title-href")?.innerText.trim() || null,
          company: card.querySelector(".company-name")?.innerText.trim() || null,
          location: card.querySelector(".locations")?.innerText.trim() || null,
          stipend: card.querySelector(".stipend")?.innerText.trim() || null,
          duration:
            card.querySelector(".row-1-item:nth-of-type(3) span")?.innerText.trim() || null,
          posted:
            card.querySelector(".color-labels")?.innerText.trim() || null,
          link: card.querySelector(".job-title-href")?.href || null
        });
      } catch {}
    });

    return results;
  });

  await browser.close();
  return jobs;
};

export async function scrapeInternshalaJobDetail(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector(".detail_view");

    const details = await page.$eval(
      ".internship_details .text-container",
      el => el.innerText.trim()
    );

    const aboutCompany = await page.$eval(
      ".about_company_text_container",
      el => el.innerText.trim()
    );

    const whoCanApply = await page.$eval(
      ".who_can_apply",
      el => el.innerText.trim()
    ).catch(() => "");

    const perks = await page.$eval(
      ".perks_heading + .round_tabs_container",
      el => el.innerText.trim()
    ).catch(() => "");

    return {
      descriptionHtml: `
        <h3>About the internship</h3>
        <p>${details}</p>
        <h3>Who can apply</h3>
        <p>${whoCanApply}</p>
        <h3>Perks</h3>
        <p>${perks}</p>
        <h3>About the company</h3>
        <p>${aboutCompany}</p>
      `
    };
  } catch (err) {
    console.error("JD scrape error:", err.message);
    return null;
  } finally {
    await browser.close();
  }
}
