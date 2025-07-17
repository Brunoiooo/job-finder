import prismaClient from "@/lib/prismaClient";
import { Page } from "puppeteer";
import { IJob } from "./IScraper";
import { Scraper } from "../Scraper";

export class ScraperUseme extends Scraper {
  constructor(private readonly pages: number = 1) {
    super();
  }

  protected async getJobs(page: Page) {
    const jobs: IJob[] = [];

    for (const { url } of await prismaClient.usemeCategories.findMany({
      select: {
        url: true,
      },
    }))
      jobs.push(...(await this.getPackages(page, new URL(url))));

    return jobs;
  }

  private async getPackages(page: Page, url: URL): Promise<IJob[]> {
    const urls: string[] = [];

    for (let i = 1; i <= this.pages; i++) {
      url.searchParams.set("page", i.toString());
      urls.push(...(await this.getUrls(page, url)));
    }

    const jobs: IJob[] = [];
    for (const url of urls) jobs.push(await this.getJob(page, new URL(url)));

    return jobs;
  }

  private async getUrls(page: Page, url: URL): Promise<string[]> {
    await page.goto(url.href, {
      waitUntil: "networkidle2",
    });

    return await page.evaluate(async () => {
      const urls: string[] = [];

      for (const element of document.getElementsByClassName("job__title-link"))
        if (element instanceof HTMLAnchorElement) urls.push(element.href);

      return urls;
    });
  }

  private async getJob(page: Page, url: URL): Promise<IJob> {
    await page.goto(url.href, {
      waitUntil: "networkidle2",
    });

    return {
      source: "USEME",
      url: url.href,
      summary: await page.evaluate(async () => {
        const title =
          document.getElementsByClassName("jobs__page-title")[0].textContent;

        if (!title) throw new Error("Title not found.");

        const summary = document.getElementsByClassName(
          "jobs-summary__item-text"
        )[0].textContent;

        if (!summary) throw new Error("Summary not found.");

        return `Tytuł ogłoszenia: ${title}
      Treść ogłoszenia: ${summary}`;
      }),
    };
  }
}
