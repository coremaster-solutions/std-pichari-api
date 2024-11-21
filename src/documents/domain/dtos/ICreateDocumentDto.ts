import { Prisma } from "@prisma/client";

export interface ICreateDocumentDto extends Prisma.DocumentCreateInput {
  documentTypeId: string;
  citizenId?: string;
  creatorId?: string;
}
