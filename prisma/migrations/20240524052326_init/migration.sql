-- AlterTable
ALTER TABLE "attachment_files" ADD COLUMN     "fileUrl" TEXT;

-- AlterTable
ALTER TABLE "tracking_documents" ADD COLUMN     "sentDestinations" JSONB;
