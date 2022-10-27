-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_roleId_fkey";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
