import { scraperController } from './controllers/scraper.controller';

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async scheduled(controller, env, ctx) {
		// This function is called on a schedule defined in `wrangler.jsonc`.
		// You can use it to perform periodic tasks.
		await scraperController(env);
	},
	async fetch(request, env, ctx): Promise<Response> {
		const path = new URL(request.url).pathname;

		return new Response('Hello, world! This is your Cloudflare Worker responding to a fetch request.');
	},
} satisfies ExportedHandler<Env>;
