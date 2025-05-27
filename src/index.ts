import { scrapeExtensionData } from "./scrapeExtensionData/scrapeExtensionData.js";

const scrapeData = async () => {
  const scrapedData = await scrapeExtensionData(
    "https://chromewebstore.google.com/detail/sponsorblock-for-youtube/mnjggcdmjocbbbhaepdhchncahnbgone?hl=en&authuser=1"
  );
  console.log("scraped Data", scrapedData);
};
