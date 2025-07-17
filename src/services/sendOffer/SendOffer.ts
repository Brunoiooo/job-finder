import prismaClient from "@/lib/prismaClient";
import puppeteer, { Page } from "puppeteer";

export abstract class SendOffer {
  constructor(private readonly id: bigint) {}

  async Start() {
    const browser = await puppeteer.launch({
      headless: process.env["DEBUG"] ? false : undefined,
    });

    try {
      const page = await browser.newPage();

      await this.Login(page);

      const { offer, url } = await prismaClient.job.findFirstOrThrow({
        where: {
          id: this.id,
          offer: {
            not: null,
          },
        },
        select: {
          offer: true,
          url: true,
        },
      });

      if (!offer) throw new Error("offer does not exist.");

      await this.Send(page, offer, url);

      await prismaClient.job.update({
        data: {
          sent: true,
        },
        where: {
          id: this.id,
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
