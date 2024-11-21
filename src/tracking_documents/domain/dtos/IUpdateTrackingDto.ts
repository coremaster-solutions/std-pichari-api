import { Prisma } from "@prisma/client";

export interface IUpdateTrackingDto extends Prisma.TrackingDocumentUpdateInput {
  documentId?: string;
  personalId?: string;
  originOfficeId?: string;
  originPersonalId?: string;
  destinyOfficeId?: string;
  destinyPersonalId?: string | null;
  attachments?: string[];
}
