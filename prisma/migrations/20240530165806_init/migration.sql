/*
  Warnings:

  - You are about to drop the column `modelId` on the `attachment_files` table. All the data in the column will be lost.
  - Added the required column `entityType` to the `attachment_files` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AttachmentType" AS ENUM ('DOCUMENT', 'TRACKING_DOCUMENT');

-- AlterTable
ALTER TABLE "attachment_files" DROP COLUMN "modelId",
ADD COLUMN     "entityId" UUID,
ADD COLUMN     "entityType" "AttachmentType" NOT NULL;
