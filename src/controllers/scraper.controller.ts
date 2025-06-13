import { getExtensions } from '../services/extensions.service';

export const scraperController = async (env: Env) => {
	const extensions = await getExtensions(env);
	extensions.forEach((extension) => {
		console.log(`Extension: ${extension.name}, URL: ${extension.url} is being scraped.`);
	});
};
