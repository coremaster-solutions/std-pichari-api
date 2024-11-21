import { Prisma } from "@prisma/client";

export interface ICreateDocumentTypeDto extends Prisma.DocumentTypeCreateInput {
  creatorId?: string;
}
