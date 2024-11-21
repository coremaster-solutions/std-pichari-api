/*
  Warnings:

  - The primary key for the `personals_offices` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "personals_offices" DROP CONSTRAINT "personals_offices_pkey",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "personals_offices_pkey" PRIMARY KEY ("id");
