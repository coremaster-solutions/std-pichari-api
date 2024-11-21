/*
  Warnings:

  - You are about to drop the `group_permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `office_group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "group_permission" DROP CONSTRAINT "group_permission_groupId_fkey";

-- DropForeignKey
ALTER TABLE "group_permission" DROP CONSTRAINT "group_permission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "office_group" DROP CONSTRAINT "office_group_groupId_fkey";

-- DropForeignKey
ALTER TABLE "office_group" DROP CONSTRAINT "office_group_officeId_fkey";

-- DropTable
DROP TABLE "group_permission";

-- DropTable
DROP TABLE "office_group";

-- CreateTable
CREATE TABLE "group_permissions" (
    "groupId" UUID NOT NULL,
    "permissionId" UUID NOT NULL,

    CONSTRAINT "group_permissions_pkey" PRIMARY KEY ("groupId","permissionId")
);

-- CreateTable
CREATE TABLE "office_groups" (
    "groupId" UUID NOT NULL,
    "officeId" UUID NOT NULL,

    CONSTRAINT "office_groups_pkey" PRIMARY KEY ("groupId","officeId")
);

-- AddForeignKey
ALTER TABLE "group_permissions" ADD CONSTRAINT "group_permissions_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_permissions" ADD CONSTRAINT "group_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "office_groups" ADD CONSTRAINT "office_groups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "office_groups" ADD CONSTRAINT "office_groups_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
