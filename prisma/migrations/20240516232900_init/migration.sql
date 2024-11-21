-- AlterTable
ALTER TABLE "personals" ADD COLUMN     "officeId" UUID,
ADD COLUMN     "position" TEXT;

-- AddForeignKey
ALTER TABLE "personals" ADD CONSTRAINT "personals_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
