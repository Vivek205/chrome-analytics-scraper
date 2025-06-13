import { getPrismaClient } from '../database/client';

export const addExtensionMetric = async (env: Env, extensionId: string, metrics: any) => {
	const db = getPrismaClient(env.DATABASE_URL_DIRECT);
	try {
		await db.extensionMetric.create({
			data: {
				extensionId,
				ratingsValue: metrics.ratingsValue,
				ratingsCount: metrics.ratingsCount,
				activeUsers: metrics.activeUsers,
			},
		});
	} catch (error) {
		console.error('Error adding extension metrics:', error);
		throw new Error('Failed to add extension metrics');
	}
};
