/*
  Warnings:

  - You are about to drop the column `personalId` on the `documents` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_personalId_fkey";

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "personalId",
ADD COLUMN     "creatorId" UUID,
ADD COLUMN     "originPersonalId" UUID;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_originPersonalId_fkey" FOREIGN KEY ("originPersonalId") REFERENCES "personals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "personals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
