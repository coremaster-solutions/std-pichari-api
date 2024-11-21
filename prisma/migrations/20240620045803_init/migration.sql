/*
  Warnings:

  - You are about to drop the column `receiveCounts` on the `documents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "receiveCounts";

-- AlterTable
ALTER TABLE "tracking_documents" ADD COLUMN     "derivedData" INTEGER;
