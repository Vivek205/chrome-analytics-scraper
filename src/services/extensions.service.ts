import { getPrismaClient } from '../database/client';

export const getExtensions = async (env: Env) => {
	const db = getPrismaClient(env.DATABASE_URL_DIRECT);
	const extensions = await db.extension.findMany({
		select: { id: true, name: true, url: true },
	});

	return extensions;
};
