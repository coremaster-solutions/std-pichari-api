-- DropForeignKey
ALTER TABLE "attachment_files" DROP CONSTRAINT "attachment_files_trackingDocumentId_fkey";

-- AddForeignKey
ALTER TABLE "attachment_files" ADD CONSTRAINT "attachment_files_trackingDocumentId_fkey" FOREIGN KEY ("trackingDocumentId") REFERENCES "tracking_documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
