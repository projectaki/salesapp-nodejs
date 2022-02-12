import cheerio from "cheerio";
import pretty from "pretty";
import scraper from "./scraper-puppeteer";
import configuration from "../appsettings.json";
import { CustomException } from "./BusinessLogic/Exception";

export interface ElgigantenPriceModel {
  productName: string;
  price: number;
}

export default class ScrapeElgiganten {
  private static url = configuration.elgiganten;

  static loadHtml = async () => {
    const html = await scraper.getHtml(this.url + "/page-1");

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
    console.log(
      "HERE: ",
      firstProduct.map((x) => ({ ...x, productName: x.productName.trim() }))
    );
  };

  static test1 = async () => {
    const html = await scraper.getHtml(this.url);

    const $ = cheerio.load(html);
    const firstProduct = $(".product-tiles").text();
    if (!firstProduct) throw new CustomException();
    console.log(firstProduct);
  };

  static test2 = async () => {
    const html = await scraper.getHtml(this.url);

    const $ = cheerio.load(html);
    const lastPAgeNUmer = $(".pagination__item").last().text();
    console.log(lastPAgeNUmer);
  };

  static async test3() {
    const html = await scraper.getHtml(this.url);
    const $ = cheerio.load(html);
    const firstProduct = $(".product-tile")
      .first()
      .find(".product-tile__image")
      .attr("src");
    console.log(firstProduct);
  }
}
