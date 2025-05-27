import { describe, it, assert, vi, expect } from "vitest";
import { scrapeExtensionData } from "./scrapeExtensionData";
import { ScrapedData } from "./types";
import * as isValidURLMod from "../lib/isValidURL";

vi.spyOn(isValidURLMod, "isValidURL").mockReturnValue(true);

const testURL =
  "https://chromewebstore.google.com/detail/sponsorblock-for-youtube/mnjggcdmjocbbbhaepdhchncahnbgone?hl=en&authuser=1";

describe("ScrapeExtensionData", () => {
  it("should return the correct scraped Data", async () => {
    const expectedResponse: ScrapedData = {
      activeUsers: 2_000_000,
      ratingsCount: 2_900,
      ratingsValue: 4.7,
    };
    const actualResponse = await scrapeExtensionData(testURL);

    assert.deepEqual(actualResponse, expectedResponse);
  });

  it("should throw error if the URL is not valid", async () => {
    vi.spyOn(isValidURLMod, "isValidURL").mockReturnValueOnce(false);

    expect(scrapeExtensionData(testURL)).rejects.toThrowError(
      `Invalid URL: ${testURL}`
    );
  });
});
