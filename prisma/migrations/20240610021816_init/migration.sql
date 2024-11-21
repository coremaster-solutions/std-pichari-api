/*
  Warnings:

  - A unique constraint covering the columns `[name,category]` on the table `document_types` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "document_types_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "document_types_name_category_key" ON "document_types"("name", "category");
