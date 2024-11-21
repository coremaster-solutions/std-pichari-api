/*
  Warnings:

  - The values [FINALIZED] on the enum `StatusProcedure` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusProcedure_new" AS ENUM ('PENDING_RECEPTION', 'ATTENDED_DERIVED', 'IN_PROGRESS', 'OBSERVED', 'ARCHIVED');
ALTER TABLE "tracking_documents" ALTER COLUMN "statusProcedure" DROP DEFAULT;
ALTER TABLE "documents" ALTER COLUMN "statusProcedure" DROP DEFAULT;
ALTER TABLE "documents" ALTER COLUMN "statusProcedure" TYPE "StatusProcedure_new" USING ("statusProcedure"::text::"StatusProcedure_new");
ALTER TABLE "tracking_documents" ALTER COLUMN "statusProcedure" TYPE "StatusProcedure_new" USING ("statusProcedure"::text::"StatusProcedure_new");
ALTER TYPE "StatusProcedure" RENAME TO "StatusProcedure_old";
ALTER TYPE "StatusProcedure_new" RENAME TO "StatusProcedure";
DROP TYPE "StatusProcedure_old";
ALTER TABLE "tracking_documents" ALTER COLUMN "statusProcedure" SET DEFAULT 'ATTENDED_DERIVED';
ALTER TABLE "documents" ALTER COLUMN "statusProcedure" SET DEFAULT 'PENDING_RECEPTION';
COMMIT;
