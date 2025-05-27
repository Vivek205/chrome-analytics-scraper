import type { ScrapedData } from "./types";
import dbClient from "../database/client";

export const updateExtensionMetrics = async (scrapedData: ScrapedData[]) => {
  const createInputData = scrapedData.map((scrapedData) => ({
    extensionId: scrapedData.extensionId,
    activeUsers: scrapedData.metrics.activeUsers,
    ratingsCount: scrapedData.metrics.ratingsCount,
    ratingsValue: scrapedData.metrics.ratingsValue,
  }));

  const result = await dbClient.extensionMetric.createMany({
    data: createInputData,
  });
  console.log(`${result.count} metrics created`);
};
