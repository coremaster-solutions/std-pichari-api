/*
  Warnings:

  - You are about to drop the column `groupId` on the `personals_offices` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "office_group" (
    "groupId" UUID NOT NULL,
    "officeId" UUID NOT NULL,

    CONSTRAINT "office_group_pkey" PRIMARY KEY ("groupId","officeId")
);

-- AddForeignKey
ALTER TABLE "office_group" ADD CONSTRAINT "office_group_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "office_group" ADD CONSTRAINT "office_group_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
