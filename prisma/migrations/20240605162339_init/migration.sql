/*
  Warnings:

  - A unique constraint covering the columns `[procedureNumber,documentNumber,documentTypeId,creatorId]` on the table `documents` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "documents_documentNumber_key";

-- DropIndex
DROP INDEX "documents_procedureNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "documents_procedureNumber_documentNumber_documentTypeId_cre_key" ON "documents"("procedureNumber", "documentNumber", "documentTypeId", "creatorId");
