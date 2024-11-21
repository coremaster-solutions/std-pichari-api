import { OfficeTypeEnum } from "@/offices/domain/enum";
import { z } from "zod";

export const officeCreateBodySchema = z.object({
  name: z.string().min(5),
  description: z.string().min(5),
  officeType: z.nativeEnum(OfficeTypeEnum),
  creatorId: z.string().uuid().optional(),
  parentOfficeId: z.string().uuid().optional(),
});

export const officeGetAllQuerySchema = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
  term: z.string().optional(),
  dateTo: z.string().optional(),
  dateFrom: z.string().optional(),
});

export const officeUpdateBodySchema = z.object({
  name: z.string().min(5).optional(),
  description: z.string().min(5).optional(),
  officeType: z.nativeEnum(OfficeTypeEnum).optional(),
  parentOfficeId: z.string().uuid().optional(),
  groupId: z.string().uuid().optional(),
});
