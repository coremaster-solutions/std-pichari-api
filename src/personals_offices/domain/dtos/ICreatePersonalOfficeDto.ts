import { Prisma } from "@prisma/client";

export interface ICreatePersonalOfficeDto
  extends Prisma.PersonalsOfficesCreateInput {
  personalId: string;
  officeId: string;
}
