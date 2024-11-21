-- AlterTable
ALTER TABLE "archivists" ADD COLUMN     "creatorId" UUID;

-- AddForeignKey
ALTER TABLE "archivists" ADD CONSTRAINT "archivists_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "personals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
