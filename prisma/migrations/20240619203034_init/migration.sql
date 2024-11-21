/*
  Warnings:

  - You are about to drop the column `destinyOfficeId` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `destinyPersonalId` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `isFirstReceived` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `originOfficeId` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `originPersonalId` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `originalData` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `statusProcedure` on the `documents` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_destinyOfficeId_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_destinyPersonalId_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_originOfficeId_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_originPersonalId_fkey";

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "destinyOfficeId",
DROP COLUMN "destinyPersonalId",
DROP COLUMN "isFirstReceived",
DROP COLUMN "originOfficeId",
DROP COLUMN "originPersonalId",
DROP COLUMN "originalData",
DROP COLUMN "statusProcedure";
