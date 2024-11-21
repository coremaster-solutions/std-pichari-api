import { z } from "zod";

export const permissionCreateBodySchema = z.object({
  value: z.string().min(5),
  description: z.string().min(5),
});

export const permissionGetAllQuerySchema = z.object({
  term: z.string().optional(),
});

export const permissionUpdateBodySchema = z.object({
  value: z.string().min(5).optional(),
  description: z.string().min(5).optional(),
});
