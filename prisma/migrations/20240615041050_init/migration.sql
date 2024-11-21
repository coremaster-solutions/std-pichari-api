/*
  Warnings:

  - The values [REGISTRATION_CONTROL] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('PART_OF_TABLE', 'ADMIN', 'IT');
ALTER TABLE "personals" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "personals" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "personals" ALTER COLUMN "role" SET DEFAULT 'PART_OF_TABLE';
COMMIT;
