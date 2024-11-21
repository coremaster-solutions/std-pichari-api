import { PersonalsOffices, Prisma } from "@prisma/client";

export interface PersonalOfficeModel extends PersonalsOffices {}

export const selectPersonalOffice: Prisma.PersonalsOfficesSelect = {
  id: true,
  isMain: true,
  position: true,
  personalId: true,
  officeId: true,
};
