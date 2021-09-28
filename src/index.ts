import puppeteer from "puppeteer";
import cheerio from "cheerio";

const url = "https://www.elgiganten.dk/tilbud";

const getPage = async (url: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36"
  );
  await page.goto(url, { waitUntil: "networkidle0" });

  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();
  return html;
};

const loadHtml = async () => {
  const html = await getPage(url);
  const $ = cheerio.load(html);

  console.log("🚀", $.html());
};

loadHtml();
