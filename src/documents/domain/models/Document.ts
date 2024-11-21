import { selectAttributePersonal } from "@/personals/domain/repositories";
import { Model } from "@/shared/domain/models";
import { Document, Prisma } from "@prisma/client";
import { CitizenModel } from "./CitizenDocument";
import { OfficeModel } from "@/offices/domain/models";
import { PersonalModel } from "@/personals/domain/models";
import { TrackingDocumentModel } from "@/tracking_documents/domain/models";

export interface DocumentModel extends Document {
  citizen?: CitizenModel | null;
  creator?: PersonalModel | null;
  trackings?: TrackingDocumentModel[];
  tracking?: TrackingDocumentModel | null;
}

export interface DestinationProcedureModel {
  label: string;
  value: string;
  model: Model;
}

export const selectDocument: Prisma.DocumentSelect = {
  id: true,
  procedureNumber: true,
  documentNumber: true,
  folioNumber: true,
  issue: true,
  documentUrl: true,
  attachmentDocumentUrl: true,
  statusSend: true,
  documentTypeId: true,
  citizenId: true,
  createdAt: true,
  updatedAt: true,
  documentType: true,
  citizen: true,
  procedureType: true,
  shippingAverage: true, // medio de envio
  creator: {
    select: selectAttributePersonal,
  },
  archivistId: true,
};

export interface OriginalData {
  originOffice?: OfficeModel;
  originPersonal?: PersonalModel;
  destinyOffice?: OfficeModel;
  destinyPersonal?: PersonalModel;
}
