/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `offices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "offices_name_key" ON "offices"("name");
