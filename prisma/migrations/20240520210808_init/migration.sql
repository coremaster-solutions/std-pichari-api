-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "destinyOfficeId" UUID,
ADD COLUMN     "destinyPersonalId" UUID;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_destinyOfficeId_fkey" FOREIGN KEY ("destinyOfficeId") REFERENCES "offices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_destinyPersonalId_fkey" FOREIGN KEY ("destinyPersonalId") REFERENCES "personals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
