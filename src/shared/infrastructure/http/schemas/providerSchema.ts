import { z } from "zod";
import { onlyNumbersRegex } from "./validationsRegex";

export const providerCreateBodySchema = z.object({
  name: z.string().min(6),
  address: z.string().min(11),
  ruc: z.string().min(11).regex(onlyNumbersRegex, {
    message: "must be contain only numbers",
  }),
  phone: z.string().max(9).regex(onlyNumbersRegex, {
    message: "must be contain only numbers",
  }),
});

export const providerGetAllQuerySchema = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
  term: z.string().optional(),
  dateTo: z.string().optional(),
  dateFrom: z.string().optional(),
});

export const providerUpdateBodySchema = z.object({
  name: z.string().min(6).optional(),
  address: z.string().min(11).optional(),
  ruc: z
    .string()
    .min(11)
    .regex(onlyNumbersRegex, {
      message: "must be contain only numbers",
    })
    .optional(),
  phone: z
    .string()
    .max(9)
    .regex(onlyNumbersRegex, {
      message: "must be contain only numbers",
    })
    .optional(),
});
