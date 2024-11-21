import { selectPersonalOffice } from "@/personals_offices/domain/models";
import { Prisma } from "@prisma/client";

export const selectAttributePersonal: Prisma.PersonalSelect = {
  id: true,
  email: true,
  username: true,
  firstName: true,
  first_lastName: true,
  second_lastName: true,
  documentType: true,
  documentNumber: true,
  birthdate: true,
  address: true,
  civilStatus: true,
  ubigeo: true,
  phone: true,
  cellphone: true,
  avatarUrl: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  position: true,
  rucNumber: true,
  role: true,
  firstLoginAt: true,
  positionOptional: true,
  personalOffices: {
    select: { ...selectPersonalOffice, office: true },
  },
};
