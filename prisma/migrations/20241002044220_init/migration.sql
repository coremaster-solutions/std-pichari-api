/*
  Warnings:

  - You are about to drop the column `documentNumbersByType` on the `offices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "offices" DROP COLUMN "documentNumbersByType",
ADD COLUMN     "currentDocumentNumbers" JSONB;
