-- AlterTable
ALTER TABLE "archivists" ADD COLUMN     "officeId" UUID;

-- AddForeignKey
ALTER TABLE "archivists" ADD CONSTRAINT "archivists_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
