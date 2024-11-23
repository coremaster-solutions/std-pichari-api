import {
  DocumentTypeIdConst,
  RoleEnum,
  StatusPersonalEnum,
} from "@/personals/domain/enum";
import { z } from "zod";
export const personalRefreshTokenBodySchema = z.object({
  refresh_token: z.string().min(6),
});
export const personalLoginBodySchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
});
export const personalCreateBodySchema = z.object({
  firstName: z.string().min(4),
  username: z.string().min(4),
  first_lastName: z.string().min(4),
  second_lastName: z.string().min(4),
  email: z.string().email(),
  documentType: z.nativeEnum(DocumentTypeIdConst),
  documentNumber: z.string().min(8),
  password: z.string().min(6),
  address: z.string().min(6),
  civilStatus: z.string().min(6),
  ubigeo: z.string().min(4).optional(),
  birthdate: z.string().datetime().optional(),
  phone: z.string().min(8).optional(),
  cellphone: z.string().max(9),
  avatarUrl: z.string().optional(),
  rucNumber: z.string().min(11).optional(),
  status: z.nativeEnum(StatusPersonalEnum).optional(),
  officeId: z.string().uuid({ message: "Obligatorio" }),
  position: z.string().min(4),
});

export const personalUpdateBodySchema = z.object({
  name: z.string().min(4).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  avatarUrl: z.string().optional(),
  firstName: z.string().min(4).optional(),
  username: z.string().min(4).optional(),
  first_lastName: z.string().min(4).optional(),
  second_lastName: z.string().min(4).optional(),
  documentType: z.nativeEnum(DocumentTypeIdConst).optional(),
  documentNumber: z.string().min(8).optional(),
  address: z.string().min(6).optional(),
  civilStatus: z.string().min(6).optional(),
  ubigeo: z.string().min(4).optional(),
  birthdate: z.string().datetime().optional(),
  phone: z.string().min(8).optional(),
  cellphone: z.string().max(9).optional(),
  rucNumber: z.string().min(11).optional(),
  status: z.nativeEnum(StatusPersonalEnum).optional(),
  role: z.nativeEnum(RoleEnum).optional(),
  positionOptional: z.string().optional(),
  fistLoginAt: z.string().datetime().optional(),
  officeId: z.string().uuid({ message: "Obligatorio" }).optional(),
  position: z.string().min(4).optional(),
  additionalOffices: z
    .array(
      z.object({
        id: z.string().uuid(),
        officeId: z.string().uuid(),
        position: z.string().min(4),
      })
    )
    .optional(),
});

export const personalGetAllQuerySchema = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
  term: z.string().optional(),
  dateTo: z.string().optional(),
  dateFrom: z.string().optional(),
  officeId: z.string().optional(),
  status: z.nativeEnum(StatusPersonalEnum).optional(),
  role: z.nativeEnum(RoleEnum).optional(),
});

export const forgotPasswordBodySchema = z.object({
  username: z.string().min(4),
});

export const resetPasswordBodySchema = z.object({
  token: z.string().uuid(),
  password: z.string().min(6),
});
