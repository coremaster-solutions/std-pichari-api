/*
  Warnings:

  - You are about to drop the column `officeId` on the `personals` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "personals" DROP CONSTRAINT "personals_officeId_fkey";

-- AlterTable
ALTER TABLE "personals" DROP COLUMN "officeId";

-- CreateTable
CREATE TABLE "personals_offices" (
    "personalId" UUID NOT NULL,
    "officeId" UUID NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "personals_offices_pkey" PRIMARY KEY ("personalId","officeId")
);

-- AddForeignKey
ALTER TABLE "personals_offices" ADD CONSTRAINT "personals_offices_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "personals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personals_offices" ADD CONSTRAINT "personals_offices_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
