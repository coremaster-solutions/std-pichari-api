/*
  Warnings:

  - You are about to drop the column `creatorId` on the `archivists` table. All the data in the column will be lost.
  - You are about to drop the column `officeId` on the `archivists` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,entityId]` on the table `archivists` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ArchivistType" AS ENUM ('OFFICE', 'PERSONAL');

-- DropForeignKey
ALTER TABLE "archivists" DROP CONSTRAINT "archivists_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "archivists" DROP CONSTRAINT "archivists_officeId_fkey";

-- DropIndex
DROP INDEX "archivists_name_creatorId_key";

-- DropIndex
DROP INDEX "archivists_name_officeId_key";

-- AlterTable
ALTER TABLE "archivists" DROP COLUMN "creatorId",
DROP COLUMN "officeId",
ADD COLUMN     "entityId" UUID,
ADD COLUMN     "entityType" "ArchivistType";

-- AlterTable
ALTER TABLE "attachment_files" ALTER COLUMN "entityType" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "archivists_name_entityId_key" ON "archivists"("name", "entityId");
