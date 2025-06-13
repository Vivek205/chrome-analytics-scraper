import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaNeon } from '@prisma/adapter-neon';

export const getPrismaClient = (databaseUrl: string) => {
	const adapter = new PrismaNeon({ connectionString: databaseUrl });
	const prisma = new PrismaClient({
		adapter,
	}).$extends(withAccelerate());

	return prisma;
};
