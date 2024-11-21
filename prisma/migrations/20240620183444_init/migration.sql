-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_archivistId_fkey";

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_archivistId_fkey" FOREIGN KEY ("archivistId") REFERENCES "archivists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
