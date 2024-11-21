/*
  Warnings:

  - The `status` column on the `personals` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusPersonal" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "personals" DROP COLUMN "status",
ADD COLUMN     "status" "StatusPersonal" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "STATUS_PERSONAL";
