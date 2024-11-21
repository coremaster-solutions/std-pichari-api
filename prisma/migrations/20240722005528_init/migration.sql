/*
  Warnings:

  - The primary key for the `group_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `office_groups` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "group_permissions" DROP CONSTRAINT "group_permissions_pkey",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "group_permissions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "office_groups" DROP CONSTRAINT "office_groups_pkey",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "office_groups_pkey" PRIMARY KEY ("id");
