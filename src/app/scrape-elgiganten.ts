import cheerio from "cheerio";
import pretty from "pretty";
import scraper from "./scraper-puppeteer";
import configuration from "../appsettings.json";

export interface ElgigantenPriceModel {
  productName: string;
  price: number;
}

export default class ScrapeElgiganten {
  private static url = configuration.elgiganten;

  static loadHtml = async () => {
    const html = await scraper.getHtml(this.url);

    const $ = cheerio.load(html);
    const firstProduct = $(".product-tile")
      .map((idx, el) => {
        const model: ElgigantenPriceModel = {
          productName: $(el).attr("title") ?? "",
          price: parseInt($(el).find(".price").text()),
        };
        return model;
      })
      .toArray();
    console.log("HERE: ", firstProduct);
  };
}
