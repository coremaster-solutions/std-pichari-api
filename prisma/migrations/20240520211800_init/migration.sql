-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "message" TEXT;

-- CreateTable
CREATE TABLE "trackin_documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "statusProcedure" "StatusProcedure" NOT NULL DEFAULT 'ATTENDED_DERIVED',
    "documentId" UUID,
    "originOfficeId" UUID,
    "personalId" UUID,
    "receivedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "destinyOfficeId" UUID,
    "destinyPersonalId" UUID,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "trackin_documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trackin_documents" ADD CONSTRAINT "trackin_documents_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trackin_documents" ADD CONSTRAINT "trackin_documents_originOfficeId_fkey" FOREIGN KEY ("originOfficeId") REFERENCES "offices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trackin_documents" ADD CONSTRAINT "trackin_documents_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "personals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trackin_documents" ADD CONSTRAINT "trackin_documents_destinyOfficeId_fkey" FOREIGN KEY ("destinyOfficeId") REFERENCES "offices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trackin_documents" ADD CONSTRAINT "trackin_documents_destinyPersonalId_fkey" FOREIGN KEY ("destinyPersonalId") REFERENCES "personals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
