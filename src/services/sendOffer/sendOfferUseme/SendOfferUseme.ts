import { Page } from "puppeteer";
import { SendOffer } from "../SendOffer";

export class SendOfferUseme extends SendOffer {
  private async AcceptCookies(page: Page) {
    try {
      await page.waitForSelector("#hs-eu-decline-button", { timeout: 5000 });
      await page.click("#hs-eu-decline-button");
    } catch (e) {
      console.log(e);
    }
  }

  protected async Login(page: Page) {
    await page.goto("https://useme.com/en/users/login/", {
      waitUntil: "networkidle2",
    });

    await this.AcceptCookies(page);

    const email = process.env.USEME_EMAIL;
    if (!email) throw new Error("process.env.USEME_EMAIL does not exist.");

    const password = process.env.USEME_PASSWORD;
    if (!password)
      throw new Error("process.env.USEME_PASSWORD does not exist.");

    await page.type("#id_login-email", email);
    await page.type("#id_login-password", password);

    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      page.click('button[type="submit"]'),
    ]);
  }

  protected async Send(page: Page, offer: string, url: string) {
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.goto(
      await page.evaluate(async () => {
        const anchor = document
          .getElementsByClassName("button--yellow-solid")
          .item(0);

        if (!(anchor instanceof HTMLAnchorElement))
          throw new Error("Anchor does not exist.");

        return anchor.href;
      }),
      { waitUntil: "networkidle2" }
    );

    await page.waitForSelector(
      "body > main > div > form > div.col-12.col-md-8 > div.jobs-summary.job-form > div:nth-child(2) > div > react-text-editor > div > div._rootContentEditableWrapper_yms4a_1097.mdxeditor-root-contenteditable > div:nth-child(1)"
    );
    await page.click(
      "body > main > div > form > div.col-12.col-md-8 > div.jobs-summary.job-form > div:nth-child(2) > div > react-text-editor > div > div._rootContentEditableWrapper_yms4a_1097.mdxeditor-root-contenteditable > div:nth-child(1)"
    );

    await page.keyboard.type(offer);

    await page.waitForSelector("#id_copyright_transfer_2");
    await page.click("#id_copyright_transfer_2");

    await page.waitForSelector("#id_payment");
    await page.type("#id_payment", process.env["USEME_PAYMENT"] ?? "8000");

    await page.waitForSelector("#id_work_days");
    await page.type("#id_work_days", process.env["USEME_WORK_DAYS"] ?? "10");

    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      page.click('button[type="submit"]'),
    ]);

    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      page.click('button[type="submit"]'),
    ]);
  }
}
