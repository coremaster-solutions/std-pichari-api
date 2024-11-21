import { Prisma } from "@prisma/client";

export interface IUpdateGroupPermissionDto
  extends Prisma.GroupPermissionUpdateInput {
  permissionId: string;
  groupId?: string;
}
