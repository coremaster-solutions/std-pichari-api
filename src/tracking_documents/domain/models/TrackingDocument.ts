import { DocumentModel, selectDocument } from "@/documents/domain/models";
import { OfficeModel } from "@/offices/domain/models";
import { PersonalModel } from "@/personals/domain/models";
import { selectAttributePersonal } from "@/personals/domain/repositories";
import { Office, Prisma, TrackingDocument } from "@prisma/client";

export type DeriveData = {
  originOffice?: OfficeModel;
  originPersonal?: PersonalModel;
  destinyOffice?: OfficeModel;
  destinyPersonal?: PersonalModel;
};

export interface TrackingDocumentModel extends TrackingDocument {
  destinyOffice?: Office | null;
  document?: DocumentModel | null;
  destinyPersonal?: PersonalModel | null;
}

export const selectTrackingDocument: Prisma.TrackingDocumentSelect = {
  id: true,
  procedureNumber: true,
  statusProcedure: true,
  document: { select: selectDocument },
  documentId: true,
  originOffice: true,
  originOfficeId: true,
  originPersonal: {
    select: selectAttributePersonal,
  },
  originPersonalId: true,
  receivedDate: true,
  destinyOffice: true,
  destinyOfficeId: true,
  destinyPersonal: {
    select: selectAttributePersonal,
  },
  destinyPersonalId: true,
  message: true,
  attentionPriority: true,
  sentDestinations: true,
  createdAt: true,
  updatedAt: true,
  copyDerivation: true,
  derivedData: true,
  previousMessage: true,
  previousStatusProcedure: true,
};
