import { addExtensionMetric } from '../services/extensionMetrics.service';
import { getExtensions } from '../services/extensions.service';
import { scrapeExtension } from '../services/scraper.service';

export const scraperController = async (env: Env) => {
	try {
		const extensions = await getExtensions(env);
		const promises = extensions.map(async (extension) => {
			const scrapedData = await scrapeExtension(env, extension);
			if (!scrapedData) {
				return;
			}
			const { ratingsValue, ratingsCount, activeUsers } = scrapedData;
			if (ratingsValue == null || activeUsers == null || ratingsCount == null) {
				console.warn(`Incomplete data for extension ${extension.id}:`, JSON.stringify(scrapedData));
				return;
			}
			await addExtensionMetric(env, extension.id, {
				ratingsValue,
				ratingsCount,
				activeUsers,
			});
		});
		const results = await Promise.allSettled(promises);
		const successCount = results.filter((result) => result.status === 'fulfilled').length;
		const failureCount = results.filter((result) => result.status === 'rejected').length;
		console.log(`Scraping completed: ${successCount} successful, ${failureCount} failed`);
	} catch (error) {
		console.error('Error in scraperController:', error);
	}
};
