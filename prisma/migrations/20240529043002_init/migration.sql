/*
  Warnings:

  - You are about to drop the column `derivedLastTrackingId` on the `documents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "derivedLastTrackingId",
ADD COLUMN     "inProgressLastTrackingId" TEXT;
