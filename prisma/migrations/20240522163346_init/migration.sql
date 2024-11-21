-- CreateEnum
CREATE TYPE "OfficeType" AS ENUM ('MANAGEMENT');

-- CreateEnum
CREATE TYPE "DocumentTypeCategory" AS ENUM ('INTERNAL', 'EXTERNAL');

-- AlterTable
ALTER TABLE "document_types" ADD COLUMN     "category" "DocumentTypeCategory" DEFAULT 'INTERNAL';

-- AlterTable
ALTER TABLE "offices" ADD COLUMN     "creatorId" UUID,
ADD COLUMN     "officeType" "OfficeType" DEFAULT 'MANAGEMENT';

-- AddForeignKey
ALTER TABLE "offices" ADD CONSTRAINT "offices_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "personals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
