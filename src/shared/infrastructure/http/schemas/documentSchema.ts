import { ProcedureTypeEnum, StatusDocumentEnum } from "@/documents/domain/enum";
import { DocumentTypeIdConst } from "@/personals/domain/enum";
import { z } from "zod";
import { onlyNumbersRegex } from "./validationsRegex";

const sentDestination = z.object({
  label: z.string(),
  value: z.string().uuid(),
  model: z.string(),
});

export const documentCreateAdminBodySchema = z.object({
  documentNumber: z.string().min(8),
  folioNumber: z.number(),
  issue: z.string().min(11),
  documentUrl: z.string().min(11),
  documentTypeId: z.string().uuid(),
  originOfficeId: z.string().uuid(),
  statusProcedure: z.nativeEnum(StatusDocumentEnum).optional(),

  procedureType: z.string(),
  shippingAverage: z.string(), // medio de envio
  attentionPriority: z.string(),

  creatorId: z.string().uuid(),
  documentDate: z.string(),

  destinyOfficeId: z.string().uuid().optional(),
  messageDerivation: z.string().optional(),
  copyDerivation: z.boolean(),
  sentDestinations: z.array(sentDestination).optional(),
});

export const documentWithCitizenCreateBodySchema = z.object({
  documentNumber: z.string().min(6),
  folioNumber: z.number(),
  issue: z.string().min(11),
  documentUrl: z.string().min(11),
  attachmentDocumentUrl: z.string().optional(),
  documentTypeId: z.string().uuid(),
  destinyOfficeId: z.string().uuid(),
  statusProcedure: z.nativeEnum(StatusDocumentEnum).optional(),
  citizen: z.object({
    documentType: z.nativeEnum(DocumentTypeIdConst),
    documentNumber: z
      .string()
      .regex(onlyNumbersRegex, { message: "El valor debe ser números" })
      .min(8, "El número de documento debe contener al menos 8 caracteres")
      .max(12, "El número de documento debe contener máximo 12 caracteres"),
    fullName: z
      .string()
      .min(8, "Los nombres y apellidos debe contener al menos 8 caracteres")
      .max(100, "Los nombres y apellidos debe contener máximo 100 caracteres"),
    phone: z
      .string()
      .min(8, "El teléfono debe contener al menos 8 caracteres")
      .max(9, "El teléfono debe contener máximo 100 caracteres"),
    email: z
      .string()
      .email({ message: "El correo electrónico no es válido" })
      .min(3, "E debe contener al menos 3 caracteres"),
  }),
  procedureType: z.nativeEnum(ProcedureTypeEnum),
  shippingAverage: z.string().optional(),
  attentionPriority: z.string().optional(),

  creatorId: z.string().uuid().optional(),
  originOfficeId: z.string().uuid().optional(),
});

export const documentGetAllQuerySchema = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
  term: z.string().optional(),
  dateTo: z.string().optional(),
  dateFrom: z.string().optional(),
  status: z.nativeEnum(StatusDocumentEnum).optional(),
  personalId: z.string().optional(),
  destinyOfficeId: z.string().uuid().optional(),
  destinyPersonalId: z.string().uuid().optional(),
  documentTypeId: z.string().uuid().optional(),
  citizenDocumentNumber: z.string().optional(),
  trackingNumberCorrelative: z.string().optional(),
});

export const documentUpdateBodySchema = z.object({
  documentNumber: z.string().min(6).optional(),
  folioNumber: z.number().optional(),
  issue: z.string().min(11).optional(),
  documentUrl: z.string().min(11).optional(),
  attachmentDocumentUrl: z.string().min(11).optional(),
  documentTypeId: z.string().uuid().optional(),
  originPersonalId: z.string().uuid().optional(),
  originOfficeId: z.string().uuid().optional(),
  statusProcedure: z.nativeEnum(StatusDocumentEnum).optional(),
  destinyOfficeId: z.string().uuid().optional(),
  destinyPersonalId: z.string().uuid().optional(),
  creatorId: z.string().uuid().optional(),
  archivistId: z.string().uuid().nullable().optional(),
});

export const deriveProcedureBodySchema = z.object({
  procedureNumber: z.string(),
  attentionPriority: z.string(),
  destinyOfficeId: z.string().uuid(),
  messageDerivation: z
    .string()
    .min(15, "El mensaje debe contener al menos 15 caracteres")
    .max(200, "El mensaje debe contener como máximo 200 caracteres")
    .optional(),
  sentDestinations: z.array(sentDestination).optional(),
  attachments: z.array(z.string()).optional(),
  newDocumentUrl: z.string().optional(),
  originOfficeId: z.string().uuid(),
});

export const documentWithTrackingsQuerySchema = z.object({
  documentNumber: z.string().min(6).optional(),
  correlativeNumber: z.string().min(3).optional(),
  documentNumberCitizen: z.string().min(8).optional(),
  withAttachments: z.string().optional(),
});

export const documentGetAllPendingAndDerivedQuerySchema = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
  term: z.string().optional(),
  dateTo: z.string().optional(),
  dateFrom: z.string().optional(),
  documentTypeId: z.string().uuid().optional(),
  destinyOfficeId: z.string().uuid().optional(),
  destinyPersonalId: z.string().uuid().optional(),
});

export const receiveProcedureBodySchema = z.object({
  documentId: z.string().uuid(),
});

export const returnProcedureBodySchema = z.object({
  trackingId: z.string().uuid(),
  message: z.string().min(5, "debe contener al menos 5 caracteres"),
});

export const observeProcedureBodySchema = z.object({
  procedureNumber: z.string(),
  documentId: z.string().uuid(),
  messageObserve: z
    .string()
    .min(15, "El mensaje debe contener al menos 15 caracteres")
    .max(200, "El mensaje debe contener como máximo 200 caracteres")
    .optional(),
});

export const archiveProcedureBodySchema = z.object({
  procedureNumber: z.string(),
  documentId: z.string().uuid(),
  messageArchive: z
    .string()
    .min(15, "El mensaje debe contener al menos 15 caracteres")
    .max(200, "El mensaje debe contener como máximo 200 caracteres"),
});

export const unarchiveProcedureBodySchema = z.object({
  trackingId: z.string().uuid(),
});

export const attachmentFilesProcedureBodySchema = z.object({
  documentId: z.string().uuid(),
  attachments: z.string().array().nonempty(),
});

export const documentGetCountAllQueryByStatusSchema = z.object({
  destinyOfficeId: z.string().uuid().optional(),
});

export const documentGetCountYearAllQueryByStatusSchema = z.object({
  status: z.nativeEnum(StatusDocumentEnum),
  year: z.string().min(4).regex(onlyNumbersRegex).optional(),
  backgroundColor: z.string().optional(),
});

export const shareDocumentBodySchema = z.object({
  documentId: z.string().uuid(),
  to: z.array(z.string().email()).nonempty(),
  subject: z.string(),
  message: z.string().min(8),
});
