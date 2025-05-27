import { getExtensions } from "./getExtensions";
import { scrapeExtensionData } from "./scrapeExtensionData";

export const startScraping = async () => {
  const extensions = await getExtensions();
  const promises = extensions.map(async (extension) => {
    const TIME_STAMP = new Date().toISOString();
    console.log(`${TIME_STAMP} - Scraping ${extension.url}`, "\n");
    const scrapedData = await scrapeExtensionData(extension.url);
    return {
      extensionId: extension.id,
      scrapedData,
      extensionName: extension.name,
      extensionUrl: extension.url,
    };
  });
  const scrapedData = await Promise.all(promises);
  console.table(JSON.stringify(scrapedData, null, 2));
  return scrapedData;
};
