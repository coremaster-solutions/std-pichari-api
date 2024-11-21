/*
  Warnings:

  - The values [SUB_OFFICE] on the enum `OfficeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OfficeType_new" AS ENUM ('MANAGEMENT', 'OFFICE', 'SUB_MANAGEMENT');
ALTER TABLE "offices" ALTER COLUMN "officeType" DROP DEFAULT;
ALTER TABLE "offices" ALTER COLUMN "officeType" TYPE "OfficeType_new" USING ("officeType"::text::"OfficeType_new");
ALTER TYPE "OfficeType" RENAME TO "OfficeType_old";
ALTER TYPE "OfficeType_new" RENAME TO "OfficeType";
DROP TYPE "OfficeType_old";
ALTER TABLE "offices" ALTER COLUMN "officeType" SET DEFAULT 'MANAGEMENT';
COMMIT;
