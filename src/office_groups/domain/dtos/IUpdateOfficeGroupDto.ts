import { Prisma } from "@prisma/client";

export interface IUpdateOfficeGroupDto extends Prisma.OfficeGroupUpdateInput {
  groupId?: string;
  officeId?: string;
  personalId?: string;
  personalIdToReturn?: string | null;
}
