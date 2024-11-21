import { Prisma } from "@prisma/client";

export interface IUpdateDocumentDto extends Prisma.DocumentUpdateInput {
  documentTypeId?: string;
  creatorId?: string;
  archivistId?: string | null;
}
