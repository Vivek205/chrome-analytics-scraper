import { getExtensions } from "./getExtensions";
import { scrapeExtensionData } from "./scrapeExtensionData";
import { ScrapedData } from "./types";
import { updateExtensionMetrics } from "./updateExtensionMetrics";

export const startScraping = async () => {
  const extensions = await getExtensions();
  const promisesForScraping = extensions.map<Promise<ScrapedData>>(async (extension) => {
    const TIME_STAMP = new Date().toISOString();
    console.log(`${TIME_STAMP} - Scraping ${extension.url}`, "\n");
    const scrapedData = await scrapeExtensionData(extension.url);
    return {
      extensionId: extension.id,
      metrics: scrapedData,
      extensionName: extension.name,
      extensionUrl: extension.url,
    };
  });
  const scrapedData = await Promise.all(promisesForScraping);
  console.table(JSON.stringify(scrapedData, null, 2));
  await updateExtensionMetrics(scrapedData);
};
