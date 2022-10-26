/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "authorId" INTEGER;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "gamesId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Game_authorId_key" ON "Game"("authorId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_gamesId_fkey" FOREIGN KEY ("gamesId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
