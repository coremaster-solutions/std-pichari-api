/*
  Warnings:

  - You are about to drop the column `document_type` on the `personals` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `personals` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentNumber]` on the table `personals` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentType,documentNumber]` on the table `personals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `personals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthdate` to the `personals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `civilStatus` to the `personals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentNumber` to the `personals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentType` to the `personals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `personals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_lastName` to the `personals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_lastName` to the `personals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "DocumentTypeId" ADD VALUE 'PASAPORTE';

-- AlterTable
ALTER TABLE "personals" DROP COLUMN "document_type",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "cellphone" TEXT,
ADD COLUMN     "civilStatus" TEXT NOT NULL,
ADD COLUMN     "documentNumber" VARCHAR(12) NOT NULL,
ADD COLUMN     "documentType" "DocumentTypeId" NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "first_lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "second_lastName" TEXT NOT NULL,
ADD COLUMN     "ubigeo" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "personals_username_key" ON "personals"("username");

-- CreateIndex
CREATE UNIQUE INDEX "personals_documentNumber_key" ON "personals"("documentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "personals_documentType_documentNumber_key" ON "personals"("documentType", "documentNumber");
