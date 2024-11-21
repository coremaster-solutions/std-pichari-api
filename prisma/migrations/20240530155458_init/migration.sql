/*
  Warnings:

  - You are about to drop the column `year` on the `archivists` table. All the data in the column will be lost.
  - You are about to drop the column `trackingDocumentId` on the `attachment_files` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,creatorId]` on the table `archivists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,officeId]` on the table `archivists` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "attachment_files" DROP CONSTRAINT "attachment_files_trackingDocumentId_fkey";

-- AlterTable
ALTER TABLE "archivists" DROP COLUMN "year",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "attachment_files" DROP COLUMN "trackingDocumentId",
ADD COLUMN     "modelId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "archivists_name_creatorId_key" ON "archivists"("name", "creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "archivists_name_officeId_key" ON "archivists"("name", "officeId");
