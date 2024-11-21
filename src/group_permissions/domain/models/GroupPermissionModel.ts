import { PermissionModel } from "@/permissions/domain/models";
import { GroupPermission, Prisma } from "@prisma/client";

export interface GroupPermissionModel extends GroupPermission {
  permission?: PermissionModel | null;
}

export const selectGroupPermission: Prisma.GroupPermissionSelect = {
  id: true,
  groupId: true,
  permissionId: true,
};
