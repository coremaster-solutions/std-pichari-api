/*
  Warnings:

  - You are about to drop the column `derivedData` on the `tracking_documents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tracking_documents" DROP COLUMN "derivedData",
ADD COLUMN     "derivedData" JSONB;
