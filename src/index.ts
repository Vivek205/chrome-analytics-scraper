import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

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
	async fetch(request, env, ctx): Promise<Response> {
		const path = new URL(request.url).pathname;

		const prisma = new PrismaClient({
			datasourceUrl: env.DATABASE_URL,
		}).$extends(withAccelerate());

		const users = await prisma.user.findMany();

		console.log("Prisma Client initialized with Accelerate extension", users);
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
