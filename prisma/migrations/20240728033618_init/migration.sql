-- AlterTable
ALTER TABLE "office_groups" ADD COLUMN     "personalId" UUID;

-- AddForeignKey
ALTER TABLE "office_groups" ADD CONSTRAINT "office_groups_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "personals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
