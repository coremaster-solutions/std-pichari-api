import { z } from "zod";

export const notificationGetAllQuerySchema = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
  term: z.string().optional(),
  dateTo: z.string().optional(),
  dateFrom: z.string().optional(),
  personalId: z.string().uuid().optional(),
});

export const notificationUpdateBodySchema = z.object({
  readAt: z.string().min(5).optional(),
});
