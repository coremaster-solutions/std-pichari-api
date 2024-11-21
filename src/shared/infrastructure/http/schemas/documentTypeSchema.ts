import { CategoryDocumentTypeEnum } from "@/document_types/domain/enum";
import { DocumentTypeCategory } from "@prisma/client";
import { z } from "zod";

export const documentTypeCreateBodySchema = z.object({
  name: z.string().min(3),
  category: z.nativeEnum(CategoryDocumentTypeEnum),
});

export const categoryGetAllQuerySchema = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
  term: z.string().optional(),
  dateTo: z.string().optional(),
  dateFrom: z.string().optional(),
  category: z.nativeEnum(DocumentTypeCategory).optional(),
});

export const documentTypeUpdateBodySchema = z.object({
  name: z.string().min(3).optional(),
  category: z.nativeEnum(CategoryDocumentTypeEnum).optional(),
});
