"use server";

import { ScraperUseme } from "@/services/scraper/scraperUseme/ScraperUseme";

export async function scrapUseme(pages: number = 1) {
  if (pages < 1) throw new Error("Pages cannot be less than 1.");

  await new ScraperUseme(pages).Start();
}
