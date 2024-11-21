import { prismaService } from "@/shared/infrastructure/db";
import { TrackingDocumentPrismaRepository } from "../infrastructure/prisma/TrackingDocumentPrismaRepository";
import { GetOneTrackingDocumentService } from "../application/v1";
import { TrackingDocumentsController } from "@/shared/infrastructure/http/controllers";

export const prismaTrackingDocumentRepository =
  new TrackingDocumentPrismaRepository(prismaService);

export const getOneTrackingDocumentService = new GetOneTrackingDocumentService(
  prismaTrackingDocumentRepository
);

export const trackingDocumentsController = new TrackingDocumentsController(
  getOneTrackingDocumentService
);
