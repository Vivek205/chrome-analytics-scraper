import puppeteer from "puppeteer";
import { parseCompactNumber } from "../lib/expandNumberValues.js";
import type { ScrapedData } from "./types.js";
import { isValidURL } from "../lib/isValidURL.js";

export const scrapeExtensionData = async (
  url: string
): Promise<ScrapedData> => {
  if (!isValidURL(url)) {
    throw new Error(`Invalid URL: ${url}`);
  }
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto(url);

  let { ratingsValue, ratingsCountText, activeUsers } = await page.$eval(
    "body",
    (element: HTMLBodyElement) => {
      const [, ratingsDiv, usersDiv]: HTMLDivElement[] = Array.from(
        element
          .querySelector("section")
          ?.querySelector(":scope > section")
          ?.querySelector(":scope >     div")
          ?.querySelectorAll(":scope > div") ?? []
      );

      const usersText =
        Array.from(usersDiv.childNodes)
          .filter((node) => node.nodeType === Node.TEXT_NODE)?.[0]
          ?.nodeValue?.replace(/[,]/g, "") ?? "";

      const activeUsers = parseFloat(usersText);

      const ratingsSpan = ratingsDiv
        ?.querySelector(":scope > span")
        ?.querySelector("span");

      const ratingsValueText = ratingsSpan?.querySelector("span")?.innerText;
      const ratingsValue = parseFloat(ratingsValueText ?? "");

      const nestedRatingSpans = ratingsSpan?.querySelectorAll("span") ?? [];
      const ratingsCountText = nestedRatingSpans[nestedRatingSpans?.length - 1]
        ?.querySelector("a")
        ?.innerText.split(" ")?.[0];

      return { ratingsValue, ratingsCountText, activeUsers };
    }
  );

  const ratingsCount = parseCompactNumber(ratingsCountText as string);
  
  await browser.close();

  return { activeUsers, ratingsValue, ratingsCount };
};
