import puppeteer from "puppeteer";

export const scrapeCareerPage = async (config) => {
  const {
    company,
    careersUrl,
    jobCardSelector,
    titleSelector,
    locationSelector,
    typeSelector,
    linkSelector
  } = config;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto(careersUrl, { waitUntil: "networkidle2" });

  await page.waitForSelector(jobCardSelector, { timeout: 15000 });

  const jobs = await page.evaluate(
    ({
      company,
      jobCardSelector,
      titleSelector,
      locationSelector,
      typeSelector,
      linkSelector
    }) => {
      const cards = document.querySelectorAll(jobCardSelector);
      const results = [];

      cards.forEach(card => {
        const title = card.querySelector(titleSelector)?.innerText?.trim() || "N/A";
        const location = locationSelector
          ? card.querySelector(locationSelector)?.innerText?.trim() || "N/A"
          : "N/A";
        const type = typeSelector
          ? card.querySelector(typeSelector)?.innerText?.trim() || "N/A"
          : "N/A";

        let link = "N/A";
        if (linkSelector === "self") {
          link = card.href || "N/A";
        } else {
          link = card.querySelector(linkSelector)?.href || "N/A";
        }

        results.push({
          company,
          title,
          location,
          type,
          link
        });
      });

      return results;
    },
    {
      company,
      jobCardSelector,
      titleSelector,
      locationSelector,
      typeSelector,
      linkSelector
    }
  );

  await browser.close();
  return jobs;
};


export const fetchJobDescription = async (jobUrl, descriptionSelector) => {
  if (!jobUrl || jobUrl === "N/A") return "";

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto(jobUrl, { waitUntil: "networkidle2" });

  let descriptionHtml = "";

  try {
    descriptionHtml = await page.$eval(
      descriptionSelector,
      el => el.innerHTML
    );
  } catch {
    console.log("JD not found for:", jobUrl);
  }

  await browser.close();
  return descriptionHtml;
};
