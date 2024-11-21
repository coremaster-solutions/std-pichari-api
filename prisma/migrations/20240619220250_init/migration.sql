/*
  Warnings:

  - You are about to drop the column `attentionPriority` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `copyDerivation` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `messageDerivation` on the `documents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "attentionPriority",
DROP COLUMN "copyDerivation",
DROP COLUMN "messageDerivation";

-- AlterTable
ALTER TABLE "tracking_documents" ADD COLUMN     "copyDerivation" BOOLEAN DEFAULT false;
