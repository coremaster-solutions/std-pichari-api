import { z } from "zod";

export const officeGroupCreateBodySchema = z.object({
  officeId: z.string().uuid(),
  groupId: z.string().uuid(),
  personalId: z.string().uuid(),
});

export const officeGroupGetAllQuerySchema = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
  term: z.string().optional(),
  dateTo: z.string().optional(),
  dateFrom: z.string().optional(),
});

export const officeGroupUpdateBodySchema = z.object({
  officeId: z.string().uuid().optional(),
  groupId: z.string().uuid().optional(),
  personalId: z.string().uuid().optional(),
});

export const officeGroupGetByOfficeAndPersonalQuerySchema = z.object({
  officeId: z.string().uuid(),
  personalId: z.string().uuid(),
});
