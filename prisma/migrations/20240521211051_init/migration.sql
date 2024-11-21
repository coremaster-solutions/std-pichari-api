/*
  Warnings:

  - You are about to drop the column `message` on the `documents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "message",
ADD COLUMN     "messageDerivation" TEXT;

-- AlterTable
ALTER TABLE "tracking_documents" ADD COLUMN     "attentionPriority" TEXT;

-- CreateTable
CREATE TABLE "attachment_files" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "trackingDocumentId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "attachment_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attachment_files" ADD CONSTRAINT "attachment_files_trackingDocumentId_fkey" FOREIGN KEY ("trackingDocumentId") REFERENCES "tracking_documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
