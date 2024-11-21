import { z } from "zod";

export const groupCreateBodySchema = z.object({
  description: z.string().min(5),
  permissionIds: z.array(z.string().uuid()).optional(),
});
export const groupGetAllQuerySchema = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
  term: z.string().optional(),
  dateTo: z.string().optional(),
  dateFrom: z.string().optional(),
});

export const groupGetAllSimpleQuerySchema = z.object({
  term: z.string().optional(),
});

export const groupUpdateBodySchema = z.object({
  description: z.string().min(5).optional(),
  permissionIds: z.array(z.string().uuid()).optional(),
});
