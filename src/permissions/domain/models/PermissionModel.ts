import { Permission, Prisma } from "@prisma/client";

export interface PermissionModel extends Permission {}

export const selectPermission: Prisma.PermissionSelect = {
  id: true,
  value: true,
  description: true,
  createdAt: true,
  updatedAt: true,
};
