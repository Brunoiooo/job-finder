import prismaClient from "@/lib/prismaClient";
import puppeteer, { Page } from "puppeteer";

export abstract class SendOffer {
  constructor() {}

  async Start(ids: bigint[]) {
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
      const page = await browser.newPage();

      await this.Login(page);

      for (const { offer, url } of await prismaClient.job.findMany({
        where: {
          id: {
            in: ids,
          },
          offer: {
            not: null,
          },
        },
        select: {
          offer: true,
          url: true,
        },
      })) {
        try {
          if (!offer) throw new Error("offer is null.");
          await this.Send(page, offer, url);
        } catch (error) {
          console.error(
            error instanceof Error ? error.message : "Coś poszło nie tak..."
          );
        }
      }

      await prismaClient.job.updateMany({
        data: {
          sent: true,
        },
        where: {
          id: {
            in: ids,
          },
        },
      });
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Coś poszło nie tak..."
      );
    } finally {
      await browser.close();
    }
  }

  protected abstract Login(page: Page): Promise<void>;
  protected abstract Send(
    page: Page,
    offer: string,
    url: string
  ): Promise<void>;
}
