/*
  Warnings:

  - The primary key for the `user_extensions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `extensionId` on the `user_extensions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_extensions` table. All the data in the column will be lost.
  - Added the required column `extension_id` to the `user_extensions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_extensions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_extensions" DROP CONSTRAINT "user_extensions_extensionId_fkey";

-- DropForeignKey
ALTER TABLE "user_extensions" DROP CONSTRAINT "user_extensions_userId_fkey";

-- DropIndex
DROP INDEX "user_extensions_userId_idx";

-- AlterTable
ALTER TABLE "user_extensions" DROP CONSTRAINT "user_extensions_pkey",
DROP COLUMN "extensionId",
DROP COLUMN "userId",
ADD COLUMN     "extension_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "user_extensions_pkey" PRIMARY KEY ("user_id", "extension_id");

-- CreateIndex
CREATE INDEX "user_extensions_user_id_idx" ON "user_extensions"("user_id");

-- AddForeignKey
ALTER TABLE "user_extensions" ADD CONSTRAINT "user_extensions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_extensions" ADD CONSTRAINT "user_extensions_extension_id_fkey" FOREIGN KEY ("extension_id") REFERENCES "extensions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
