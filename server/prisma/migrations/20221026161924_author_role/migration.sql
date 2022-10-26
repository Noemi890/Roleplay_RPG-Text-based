/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "authorRoleId" INTEGER;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "authorId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Role_authorId_key" ON "Role"("authorId");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
