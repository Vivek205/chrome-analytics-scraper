/*
  Warnings:

  - You are about to drop the column `access_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `id_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider_account_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `token_type` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `active_users` on the `extension_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `extension_id` on the `extension_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `ratings_count` on the `extension_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `ratings_value` on the `extension_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `scraped_at` on the `extension_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `extensions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `extensions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `session_token` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `sessions` table. All the data in the column will be lost.
  - The primary key for the `user_extensions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `user_extensions` table. All the data in the column will be lost.
  - You are about to drop the column `extension_id` on the `user_extensions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user_extensions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_extensions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[extensionId,scrapedAt]` on the table `extension_metrics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sessionToken]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerAccountId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extensionId` to the `extension_metrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionToken` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extensionId` to the `user_extensions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user_extensions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "extension_metrics" DROP CONSTRAINT "extension_metrics_extension_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_extensions" DROP CONSTRAINT "user_extensions_extension_id_fkey";

-- DropForeignKey
ALTER TABLE "user_extensions" DROP CONSTRAINT "user_extensions_user_id_fkey";

-- DropIndex
DROP INDEX "accounts_provider_provider_account_id_key";

-- DropIndex
DROP INDEX "extension_metrics_extension_id_idx";

-- DropIndex
DROP INDEX "extension_metrics_extension_id_scraped_at_key";

-- DropIndex
DROP INDEX "extension_metrics_scraped_at_idx";

-- DropIndex
DROP INDEX "sessions_session_token_key";

-- DropIndex
DROP INDEX "user_extensions_user_id_idx";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "access_token",
DROP COLUMN "created_at",
DROP COLUMN "expires_at",
DROP COLUMN "id_token",
DROP COLUMN "provider_account_id",
DROP COLUMN "refresh_token",
DROP COLUMN "session_state",
DROP COLUMN "token_type",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiresAt" INTEGER,
ADD COLUMN     "idToken" TEXT,
ADD COLUMN     "providerAccountId" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "sessionState" TEXT,
ADD COLUMN     "tokenType" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "extension_metrics" DROP COLUMN "active_users",
DROP COLUMN "extension_id",
DROP COLUMN "ratings_count",
DROP COLUMN "ratings_value",
DROP COLUMN "scraped_at",
ADD COLUMN     "activeUsers" INTEGER,
ADD COLUMN     "extensionId" TEXT NOT NULL,
ADD COLUMN     "ratingsCount" INTEGER,
ADD COLUMN     "ratingsValue" DOUBLE PRECISION,
ADD COLUMN     "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "extensions" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "created_at",
DROP COLUMN "session_token",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sessionToken" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_extensions" DROP CONSTRAINT "user_extensions_pkey",
DROP COLUMN "created_at",
DROP COLUMN "extension_id",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "extensionId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "user_extensions_pkey" PRIMARY KEY ("userId", "extensionId");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
DROP COLUMN "email_verified",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE INDEX "extension_metrics_extensionId_idx" ON "extension_metrics"("extensionId");

-- CreateIndex
CREATE INDEX "extension_metrics_scrapedAt_idx" ON "extension_metrics"("scrapedAt");

-- CreateIndex
CREATE UNIQUE INDEX "extension_metrics_extensionId_scrapedAt_key" ON "extension_metrics"("extensionId", "scrapedAt");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "user_extensions_userId_idx" ON "user_extensions"("userId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_extensions" ADD CONSTRAINT "user_extensions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_extensions" ADD CONSTRAINT "user_extensions_extensionId_fkey" FOREIGN KEY ("extensionId") REFERENCES "extensions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extension_metrics" ADD CONSTRAINT "extension_metrics_extensionId_fkey" FOREIGN KEY ("extensionId") REFERENCES "extensions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
