"use server";

import OpenAI from "openai";
import prismaClient from "@/lib/prismaClient";
import puppeteer, { Page } from "puppeteer";

export async function scrapUseme(pages: number = 1) {
  const browser = await puppeteer.launch({ headless: false });

  try {
    const page = await browser.newPage();

    const urls: string[] = [];
    for (let i = 1; i <= pages; i++) urls.push(...(await getRecords(page, i)));

    for (const url of urls)
      if (
        !(await prismaClient.useme.count({
          where: {
            url,
          },
        }))
      )
        await insert(page, url);
  } catch (e) {
    console.error(e instanceof Error ? e.message : "Coś poszło nie tak...");
  } finally {
    await browser.close();
  }
}

async function getRecords(_page: Page, page: number): Promise<string[]> {
  await _page.goto(
    `https://useme.com/pl/jobs/category/programowanie-i-it,35/?page=${page}`,
    {
      waitUntil: "networkidle2",
    }
  );

  return await _page.evaluate(async () => {
    const urls: string[] = [];

    for (const element of document.getElementsByClassName("job__title-link"))
      if (element instanceof HTMLAnchorElement) urls.push(element.href);

    return urls;
  });
}

async function insert(_page: Page, url: string) {
  try {
    const { prompt } = await prismaClient.prompt.findFirstOrThrow({
      where: {
        id: "useme",
      },
      select: {
        prompt: true,
      },
    });

    await _page.goto(url, {
      waitUntil: "networkidle2",
    });

    const [title, summary] = await _page.evaluate(async () => {
      const title =
        document.getElementsByClassName("jobs__page-title")[0].textContent;

      if (!title) throw new Error("Title not found.");

      const summary = document.getElementsByClassName(
        "jobs-summary__item-text"
      )[0].textContent;

      if (!summary) throw new Error("Summary not found.");

      return [title, summary];
    });

    const client = new OpenAI();

    const response = await client.responses.create({
      model: "gpt-3.5-turbo",
      input: `${prompt}

        Temat: ${title}

        Opis: ${summary}`,
    });

    await prismaClient.useme.upsert({
      where: {
        url,
      },
      create: {
        offer: response.output_text,
        title,
        summary,
        url,
      },
      update: {},
    });
  } catch (e) {
    console.error(e instanceof Error ? e.message : "Coś poszło nie tak...");

    await prismaClient.useme.upsert({
      where: {
        url,
      },
      create: {
        offer: "",
        title: "",
        summary: "",
        url,
      },
      update: {},
    });
  }
}
