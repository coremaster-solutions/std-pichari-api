/*
  Warnings:

  - You are about to drop the column `number` on the `offices` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "offices_number_key";

-- AlterTable
ALTER TABLE "offices" DROP COLUMN "number";
