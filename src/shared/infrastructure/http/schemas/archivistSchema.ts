import { ArchivistType } from "@prisma/client";
import { z } from "zod";

export const archivistCreateBodySchema = z.object({
  name: z.string().min(3),
  description: z.string().min(5).optional(),
  entityId: z.string().min(5),
  entityType: z.nativeEnum(ArchivistType),
  default: z.boolean().optional(),
});

export const archivistGetAllQuerySchema = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
  term: z.string().optional(),
  dateTo: z.string().optional(),
  dateFrom: z.string().optional(),
  entityId: z.string().uuid().optional(),
  entityType: z.nativeEnum(ArchivistType).optional(),
  me: z.string().uuid().optional(),
});

export const archivistUpdateBodySchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(5).optional(),
  entityId: z.string().min(5).optional(),
  entityType: z.nativeEnum(ArchivistType).optional(),
  default: z.boolean().optional(),
});
