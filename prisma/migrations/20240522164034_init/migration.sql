-- AlterTable
ALTER TABLE "document_types" ADD COLUMN     "creatorId" UUID;

-- AddForeignKey
ALTER TABLE "document_types" ADD CONSTRAINT "document_types_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "personals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
