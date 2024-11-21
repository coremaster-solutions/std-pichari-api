/*
  Warnings:

  - A unique constraint covering the columns `[documentNumber,documentTypeId,citizenId]` on the table `documents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "documents_documentNumber_documentTypeId_citizenId_key" ON "documents"("documentNumber", "documentTypeId", "citizenId");
