/*
  Warnings:

  - You are about to drop the `personals` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum

-- DropTable
DROP TABLE "personals";

-- CreateTable
CREATE TABLE "personals" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "first_lastName" TEXT NOT NULL,
    "second_lastName" TEXT NOT NULL,
    "documentType" "DocumentTypeId" NOT NULL,
    "documentNumber" VARCHAR(12) NOT NULL,
    "password" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "civilStatus" TEXT NOT NULL,
    "ubigeo" TEXT,
    "phone" TEXT,
    "cellphone" TEXT,
    "avatarUrl" TEXT,
    "status" "StatusPersonal" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "personals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personals_email_key" ON "personals"("email");

-- CreateIndex
CREATE UNIQUE INDEX "personals_username_key" ON "personals"("username");

-- CreateIndex
CREATE UNIQUE INDEX "personals_documentNumber_key" ON "personals"("documentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "personals_documentType_documentNumber_key" ON "personals"("documentType", "documentNumber");
