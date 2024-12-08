import { prismaArchivistRepository } from "@/archivists/di";
import { prismaAttachmentFileRepository } from "@/attachment_files/di";
import { prismaNotificationRepository } from "@/notifications/di";
import { OfficePrismaRepository } from "@/offices/infrastructure/prisma/OfficePrismaRepository";
import { PrismaPersonalRepository } from "@/personals/infrastructure/prisma/PrismaPersonalRepository";
import {
  GenerateRandomNumberProvider,
  UploadFileProvider,
  emailProvider,
  jobsProvider,
  whatsAppProvider,
  wordToPDFProvider,
} from "@/shared/infrastructure/containers";
import { prismaService } from "@/shared/infrastructure/db";
import {
  DocumentsController,
  ReportsController,
} from "@/shared/infrastructure/http/controllers";
import { prismaTrackingDocumentRepository } from "@/tracking_documents/di";
import {
  ArchiveProcedureService,
  AttachmentFileProcedureService,
  CreateDocumentCitizenService,
  CreateDocumentService,
  DeriveProcedureService,
  GetAllCitizenProceduresService,
  GetAllDocumentArchivedService,
  GetAllDocumentInProgressService,
  GetAllDocumentObservedService,
  GetAllDocumentPendingAndDerivedService,
  GetAllDocumentReportService,
  GetAllDocumentService,
  GetAllDocumentServiceMe,
  GetAllDocumentSharedService,
  GetLastCorrelativeNumberDocumentService,
  GetOneDocumentService,
  GetOneDocumentWithAllTrackingsService,
  GetSummaryCountAllDocumentsService,
  GetYearSummaryCountDashboardBarGraphicDocumentsByStatusService,
  ObserveProcedureService,
  PdfGetAllDocumentService,
  ReceiveProcedureService,
  RemoveOneDocumentService,
  ReturnProcedureService,
  SendEmailCreateProcedureService,
  SendWhatsAppCreateProcedureService,
  SendWhatsAppStatusProcedureService,
  ShareDocumentByEmailsService,
  UnarchiveProcedureService,
  UpdateDocumentService,
  UploadDocumentFileTempService,
} from "../application/v1";
import { DocumentPrismaRepository } from "../infrastructure/prisma/DocumentPrismaRepository";

const prismaDocumentRepository = new DocumentPrismaRepository(prismaService);

const generateNumberProvider = new GenerateRandomNumberProvider();
const uploadFileProvider = new UploadFileProvider();
const prismaOfficeRepository = new OfficePrismaRepository(prismaService);
const prismaPersonalRepository = new PrismaPersonalRepository(prismaService);

const createDocumentCitizenService = new CreateDocumentCitizenService(
  prismaDocumentRepository,
  prismaOfficeRepository,
  generateNumberProvider,
  uploadFileProvider,
  jobsProvider,
  prismaNotificationRepository,
  prismaTrackingDocumentRepository,
  prismaAttachmentFileRepository
);
const createDocumentService = new CreateDocumentService(
  prismaDocumentRepository,
  prismaOfficeRepository,
  prismaPersonalRepository,
  generateNumberProvider,
  uploadFileProvider,
  prismaNotificationRepository,
  prismaTrackingDocumentRepository
);
const updateDocumentService = new UpdateDocumentService(
  prismaDocumentRepository,
  uploadFileProvider,
  jobsProvider
);
const getAllDocumentService = new GetAllDocumentService(
  prismaDocumentRepository,
  prismaPersonalRepository
);
const getDocumentDetailService = new GetOneDocumentService(
  prismaDocumentRepository
);
const removeOneDocumentService = new RemoveOneDocumentService(
  prismaDocumentRepository
);

const getOneDocumentWithTrackingsService =
  new GetOneDocumentWithAllTrackingsService(
    prismaDocumentRepository,
    prismaAttachmentFileRepository
  );

const getAllDocumentMeService = new GetAllDocumentServiceMe(
  prismaDocumentRepository,
  prismaPersonalRepository
);

const getAllDocumentPendingAndDerivedService =
  new GetAllDocumentPendingAndDerivedService(
    prismaDocumentRepository,
    prismaPersonalRepository
  );
const getAllDocumentInProgressService = new GetAllDocumentInProgressService(
  prismaDocumentRepository,
  prismaPersonalRepository
);
const getAllDocumentObservedService = new GetAllDocumentObservedService(
  prismaDocumentRepository,
  prismaPersonalRepository
);
const getAllDocumentArchivedService = new GetAllDocumentArchivedService(
  prismaDocumentRepository,
  prismaPersonalRepository
);

const deriveProcedureService = new DeriveProcedureService(
  uploadFileProvider,
  prismaTrackingDocumentRepository,
  prismaPersonalRepository,
  prismaAttachmentFileRepository,
  jobsProvider,
  prismaOfficeRepository,
  prismaNotificationRepository,
  prismaDocumentRepository
);

const receiveProcedureService = new ReceiveProcedureService(
  prismaPersonalRepository,
  prismaTrackingDocumentRepository,
  jobsProvider,
  prismaNotificationRepository
);

const observeProcedureService = new ObserveProcedureService(
  prismaTrackingDocumentRepository,
  jobsProvider,
  prismaOfficeRepository
);

const archiveProcedureService = new ArchiveProcedureService(
  prismaDocumentRepository,
  prismaTrackingDocumentRepository,
  prismaArchivistRepository,
  prismaPersonalRepository,
  jobsProvider,
  prismaOfficeRepository
);

const attachmentFilesProcedureService = new AttachmentFileProcedureService(
  prismaDocumentRepository,
  uploadFileProvider,
  prismaAttachmentFileRepository
);

export const sendEmailCreateProcedureService =
  new SendEmailCreateProcedureService(emailProvider);

export const getAllDocumentByDocumentNumberService =
  new GetAllCitizenProceduresService(prismaDocumentRepository);

export const sendWhatsAppCreateProcedureService =
  new SendWhatsAppCreateProcedureService(whatsAppProvider);

export const sendWhatsAppStatusProcedureService =
  new SendWhatsAppStatusProcedureService(whatsAppProvider);

export const getLastCorrelativeNumberDocumentService =
  new GetLastCorrelativeNumberDocumentService(
    prismaDocumentRepository,
    prismaTrackingDocumentRepository,
    generateNumberProvider
  );

export const getSummaryCountAllDocumentsService =
  new GetSummaryCountAllDocumentsService(
    prismaDocumentRepository,
    prismaPersonalRepository
  );

const unarchiveProcedureService = new UnarchiveProcedureService(
  prismaDocumentRepository,
  prismaTrackingDocumentRepository,
  jobsProvider
);

const getAllDocumentReportService = new GetAllDocumentReportService(
  prismaDocumentRepository
);

const pdfGetAllDocumentService = new PdfGetAllDocumentService(
  prismaDocumentRepository
);

export const uploadDocumentFileTempService = new UploadDocumentFileTempService(
  wordToPDFProvider,
  uploadFileProvider
);

export const getYearSummaryCountDashboardBarGraphicDocumentsByStatusService =
  new GetYearSummaryCountDashboardBarGraphicDocumentsByStatusService(
    prismaDocumentRepository,
    prismaPersonalRepository
  );

export const shareDocumentByEmailsService = new ShareDocumentByEmailsService(
  prismaDocumentRepository,
  jobsProvider
);

export const returnProcedureService = new ReturnProcedureService(
  prismaTrackingDocumentRepository
);

const getAllDocumentSharedService = new GetAllDocumentSharedService(
  prismaDocumentRepository,
  prismaPersonalRepository
);

export const documentsController = new DocumentsController(
  createDocumentService,
  getAllDocumentService,
  updateDocumentService,
  getDocumentDetailService,
  removeOneDocumentService,
  createDocumentCitizenService,
  deriveProcedureService,
  getOneDocumentWithTrackingsService,
  getAllDocumentMeService,
  getAllDocumentPendingAndDerivedService,
  getAllDocumentInProgressService,
  getAllDocumentObservedService,
  getAllDocumentArchivedService,
  receiveProcedureService,
  observeProcedureService,
  archiveProcedureService,
  attachmentFilesProcedureService,
  getAllDocumentByDocumentNumberService,
  getLastCorrelativeNumberDocumentService,
  getSummaryCountAllDocumentsService,
  unarchiveProcedureService,
  getYearSummaryCountDashboardBarGraphicDocumentsByStatusService,
  shareDocumentByEmailsService,
  returnProcedureService,
  getAllDocumentSharedService
);

export const reportsController = new ReportsController(
  getAllDocumentReportService,
  pdfGetAllDocumentService
);
