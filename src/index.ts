import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaNeon } from '@prisma/adapter-neon';

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

export interface Env {
	DATABASE_URL: string;
	DATABASE_URL_DIRECT: string;
}

export default {
	async scheduled(controller, env, ctx) {
		// This function is called on a schedule defined in `wrangler.jsonc`.
		// You can use it to perform periodic tasks.
		console.log('Scheduled task running');
	},
	async fetch(request, env, ctx): Promise<Response> {
		const path = new URL(request.url).pathname;

		const adapter = new PrismaNeon({ connectionString: env.DATABASE_URL });
		const prisma = new PrismaClient({
			adapter,
		}).$extends(withAccelerate());

		const users = await prisma.user.findMany();

		return Response.json(
			users.map((user) => ({
				id: user.id,
				name: user.name,
				email: user.email,
			}))
		);
	},
} satisfies ExportedHandler<Env>;
