import { Prisma } from "@prisma/client";

export interface ICreateOfficeDto extends Prisma.OfficeCreateInput {
  parentOfficeId?: string;
  creatorId?: string;
}
