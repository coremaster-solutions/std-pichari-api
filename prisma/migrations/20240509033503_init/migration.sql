-- CreateEnum
CREATE TYPE "STATUS_PERSONAL" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "DocumentTypeId" AS ENUM ('DNI', 'RUC', 'CEX');

-- CreateTable
CREATE TABLE "personals" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "document_type" "DocumentTypeId" NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "status" "STATUS_PERSONAL" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "personals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personals_email_key" ON "personals"("email");
