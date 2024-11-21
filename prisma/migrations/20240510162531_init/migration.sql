/*
  Warnings:

  - You are about to alter the column `phone` on the `citizens` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(9)`.

*/
-- AlterTable
ALTER TABLE "citizens" ALTER COLUMN "fullName" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(9);
