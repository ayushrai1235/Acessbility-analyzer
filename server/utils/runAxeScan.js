import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runAxeScan = async (url) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

    const axePath = path.resolve(__dirname, "../../server/node_modules/axe-core/axe.min.js");
    const axeScript = await fs.readFile(axePath, "utf8");

    await page.evaluate(axeScript);
    const results = await page.evaluate(() => window.axe.run());
    
    // Return all violations without filtering by impact level
    const allViolations = results.violations;

    await browser.close();
    return allViolations;
  } catch (err) {
    await browser.close();
    throw new Error("Axe scan failed: " + err.message);
  }
};

export default runAxeScan;