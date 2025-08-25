import prismaClient from "@/lib/prismaClient";
import puppeteer, { Page } from "puppeteer";
import { IJob } from "./IScraper";

export abstract class Scraper {
  async Start() {
    const browser = await puppeteer.launch({
      headless: process.env["DEBUG"] ? false : undefined,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-blink-features=AutomationControlled",
        "--lang=pl-PL",
      ],
      ignoreDefaultArgs: ["--enable-automation"],
    });

    try {
      for (const job of await this.getJobs(await browser.newPage()))
        if (
          !(await prismaClient.job.count({
            where: {
              url: job.url,
            },
          }))
        )
          await prismaClient.job.create({
            data: job,
          });
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Coś poszło nie tak..."
      );
    } finally {
      await browser.close();
    }
  }

  protected abstract getJobs(page: Page): Promise<IJob[]>;
}
