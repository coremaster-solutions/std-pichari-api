/*
  Warnings:

  - You are about to drop the column `personalId` on the `tracking_documents` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tracking_documents" DROP CONSTRAINT "tracking_documents_personalId_fkey";

-- AlterTable
ALTER TABLE "tracking_documents" DROP COLUMN "personalId",
ADD COLUMN     "originPersonalId" UUID;

-- AddForeignKey
ALTER TABLE "tracking_documents" ADD CONSTRAINT "tracking_documents_originPersonalId_fkey" FOREIGN KEY ("originPersonalId") REFERENCES "personals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
