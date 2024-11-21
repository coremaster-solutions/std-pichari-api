/*
  Warnings:

  - You are about to drop the column `previewPersonalId` on the `office_groups` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "office_groups" DROP COLUMN "previewPersonalId",
ADD COLUMN     "previousPersonalId" TEXT;
