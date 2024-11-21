import { Prisma } from "@prisma/client";

export interface IUpdateOfficeDto extends Prisma.OfficeUpdateInput {
  parentOfficeId?: string;
  creatorId?: string;
}
