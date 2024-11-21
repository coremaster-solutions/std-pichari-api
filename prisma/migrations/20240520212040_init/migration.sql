/*
  Warnings:

  - A unique constraint covering the columns `[procedureNumber]` on the table `tracking_documents` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tracking_documents" ADD COLUMN     "procedureNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "tracking_documents_procedureNumber_key" ON "tracking_documents"("procedureNumber");
