import { Prisma } from "@prisma/client";

export interface ICreateTrackingDto extends Prisma.TrackingDocumentCreateInput {
  documentId?: string;
  personalId?: string;
  originOfficeId?: string;
  originPersonalId?: string;
  destinyOfficeId?: string;
  destinyPersonalId?: string;
  attachments?: string[];
}
