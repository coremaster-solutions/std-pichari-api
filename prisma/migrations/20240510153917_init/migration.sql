-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "citizenId" UUID;

-- CreateTable
CREATE TABLE "citizens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "documentType" "DocumentTypeId" NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "fullName" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "citizens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "citizens"("id") ON DELETE SET NULL ON UPDATE CASCADE;
