import { launch, type BrowserWorker } from '@cloudflare/playwright';
import { parseCompactNumber } from '../lib/parseCompactNumber';

type Extension = {
	id: string;
	name: string;
	url: string;
};

type ScrapedResponse =
	| {
			data: {
				ratingsValue: number;
				ratingsCountText?: string;
				ratingsCount?: number;
				activeUsers: number;
			};
			error: null;
	  }
	| {
			data: null;
			error: string;
	  };

export const scrapeExtension = async (env: Env, extension: Extension) => {
	try {
		const browser = await launch(env.MYBROWSER);
		const page = await browser.newPage();

		await page.goto(extension.url, { waitUntil: 'networkidle' });

		const scrapedResponse: ScrapedResponse = await page.evaluate(() => {
			try {
				const ratingAndUsersDivs = document
					.querySelector('section')
					?.querySelector(':scope > section')
					?.querySelector(':scope > div')
					?.querySelectorAll(':scope > div');

				if (!ratingAndUsersDivs) {
					return { data: null, error: 'No rating and users divs found' };
				}
				const [, ratingsDiv, usersDiv] = Array.from(ratingAndUsersDivs);

				// Getting the active users
				const usersText =
					Array.from(usersDiv.childNodes)
						.filter((node) => node.nodeType === Node.TEXT_NODE)?.[0]
						?.nodeValue?.replace(/[,]/g, '') ?? '';
				const activeUsers = parseFloat(usersText);

				// Getting the ratings value
				const ratingsSpan = ratingsDiv.querySelector(':scope > span')?.querySelector('span');
				const ratingsValueText = ratingsSpan?.querySelector('span')?.innerText;
				const ratingsValue = parseFloat(ratingsValueText ?? '');

				// Getting the ratings count
				const nestedRatingSpans = ratingsSpan?.querySelectorAll('span');
				if (!nestedRatingSpans) {
					return { data: null, error: 'No nested rating spans found' };
				}
				const ratingsCountText = nestedRatingSpans[nestedRatingSpans?.length - 1]?.querySelector('a')?.innerText.split(' ')?.[0];

				if (isNaN(ratingsValue) || isNaN(activeUsers)) {
					return { data: null, error: 'Invalid ratings or active users value' };
				}

				return {
					data: { ratingsValue, ratingsCountText, activeUsers },
					error: null,
				};
			} catch (error) {
				console.error('Error during page evaluation:', error);
				return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
			}
		});
		if (scrapedResponse.data && scrapedResponse.data.ratingsCountText) {
			scrapedResponse.data.ratingsCount = parseCompactNumber(scrapedResponse.data.ratingsCountText);
		}
		console.log('Data scraped:', JSON.stringify(scrapedResponse));
		await browser.close();
		return scrapedResponse.data;
	} catch (error) {
		console.error(`Error scraping extension ${extension.name}:`, error);
		throw error;
	}
};
