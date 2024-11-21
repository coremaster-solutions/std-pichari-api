import { Prisma } from "@prisma/client";

export interface IUpdatePersonalOfficeDto
  extends Prisma.PersonalsOfficesUpdateInput {
  personalId?: string;
  officeId?: string;
}
