import { GroupPermissionModel } from "@/group_permissions/domain/models";
import { Group, Prisma } from "@prisma/client";

export interface GroupModel extends Group {
  permissions?: GroupPermissionModel[] | null;
}

export const selectGroup: Prisma.GroupSelect = {
  id: true,
  description: true,
  createdAt: true,
  updatedAt: true,
};
