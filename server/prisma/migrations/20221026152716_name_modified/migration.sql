/*
  Warnings:

  - You are about to drop the column `gamesId` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_gamesId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "gamesId",
ADD COLUMN     "authorGameId" INTEGER;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
