-- AlterTable
ALTER TABLE "office_groups" ADD COLUMN     "previousDataPersonal" JSONB,
ALTER COLUMN "previousPersonalId" SET DEFAULT '';
