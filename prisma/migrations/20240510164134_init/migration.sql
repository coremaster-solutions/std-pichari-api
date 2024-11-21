/*
  Warnings:

  - A unique constraint covering the columns `[documentType,documentNumber]` on the table `citizens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "citizens_documentType_documentNumber_key" ON "citizens"("documentType", "documentNumber");
