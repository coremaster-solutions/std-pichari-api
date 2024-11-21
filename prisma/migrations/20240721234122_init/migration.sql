/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `groups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "groups_description_key" ON "groups"("description");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_value_key" ON "permissions"("value");
