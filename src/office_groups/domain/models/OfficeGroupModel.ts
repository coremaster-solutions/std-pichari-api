import { GroupModel } from "@/groups/domain/models";
import { OfficeModel } from "@/offices/domain/models";
import { OfficeGroup, Prisma } from "@prisma/client";

export interface OfficeGroupModel extends OfficeGroup {
  group?: GroupModel | null;
  office?: OfficeModel | null;
}

export const selectOfficeGroup: Prisma.OfficeGroupSelect = {
  id: true,
  groupId: true,
  officeId: true,
  previousDataPersonal: true,
  personalIdToReturn: true,
  personalId: true,
};
