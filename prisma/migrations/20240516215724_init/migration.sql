/*
  Warnings:

  - You are about to drop the column `code` on the `document_types` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentOfficeId]` on the table `offices` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "document_types_code_key";

-- AlterTable
ALTER TABLE "document_types" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "personalId" UUID;

-- AlterTable
ALTER TABLE "offices" ADD COLUMN     "parentOfficeId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "offices_parentOfficeId_key" ON "offices"("parentOfficeId");

-- AddForeignKey
ALTER TABLE "offices" ADD CONSTRAINT "offices_parentOfficeId_fkey" FOREIGN KEY ("parentOfficeId") REFERENCES "offices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "personals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
