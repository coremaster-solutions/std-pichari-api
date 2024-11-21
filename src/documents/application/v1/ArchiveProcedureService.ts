import { IArchivistRepository } from "@/archivists/domain/repositories";
import { IUpdateDocumentDto } from "@/documents/domain/dtos";
import { IOfficeRepository } from "@/offices/domain/repositories";
import { IPersonalRepository } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import { IJobsProvider } from "@/shared/infrastructure/containers";
import { TrackingDocumentModel } from "@/tracking_documents/domain/models";
import { ITrackingDocumentRepository } from "@/tracking_documents/domain/repositories";
import { StatusProcedure } from "@prisma/client";
import httpStatus from "http-status";
import { IDocumentRepository } from "../../domain/repositories";
import { ISendEmailStatusProcedureServiceRequest } from "./SendEmailStatusProcedureService";
import { ISendWhatsAppStatusProcedureServiceRequest } from "./SendWhatsAppStatusProcedureService";
import { ISendWhatsAppStatusProcedureToPersonalService } from "./SendWhatsAppStatusProcedureToPersonalService";

export interface IArchiveProcedureRequest extends IUpdateDocumentDto {
  documentId: string;
  messageArchive?: string;
  personalId: string;
  procedureNumber?: string;
}

export class ArchiveProcedureService {
  constructor(
    private documentRepository: IDocumentRepository,
    private trackingDocumentRepository: ITrackingDocumentRepository,
    private archivistRepository: IArchivistRepository,
    private personalRepository: IPersonalRepository,
    private jobsProvider: IJobsProvider,
    private officeRepository: IOfficeRepository
  ) {}

  async execute({
    documentId,
    messageArchive,
    personalId,
  }: IArchiveProcedureRequest): Promise<TrackingDocumentModel> {
    const procedure = await this.trackingDocumentRepository.findById(
      documentId
    );

    if (!procedure) {
      throw new AppError({
        message: "El seguimiento del documento no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }
    const personal = await this.personalRepository.findById(personalId);

    if (!personal) {
      throw new AppError({
        message: "El personal no está logueado",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const officeExists = await this.officeRepository.findById(
      procedure.destinyOfficeId!
    );

    if (!officeExists) {
      throw new AppError({
        message: `La oficina de destino con ese id: ${procedure.destinyOfficeId} no existe`,
      });
    }

    const currentArchivist =
      await this.archivistRepository.findByEntityIdAndDefault(
        procedure.destinyOfficeId ?? ""
      );

    if (!currentArchivist) {
      throw new AppError({
        message: "El archivero no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const tracking = await this.trackingDocumentRepository.update(documentId, {
      statusProcedure: StatusProcedure.ARCHIVED,
      message: messageArchive as string,
      previousMessage: procedure.message,
      previousStatusProcedure: procedure.statusProcedure,
    });

    const document = await this.documentRepository.update(
      tracking?.documentId ?? "",
      {
        archivistId: currentArchivist.id,
      }
    );

    if (document.citizenId) {
      await this.jobsProvider.add<ISendEmailStatusProcedureServiceRequest>({
        type: "send_email_status_procedure",
        data: {
          procedure: document,
          tracking,
        },
      });

      await this.jobsProvider.add<ISendWhatsAppStatusProcedureServiceRequest>({
        type: "send_whatsapp_status_procedure",
        data: {
          procedure: document,
          tracking,
        },
      });
    }

    // if (document?.creator) {
    //   this.jobsProvider.add<ISendWhatsAppStatusProcedureToPersonalService>({
    //     type: "send_whatsapp_status_procedure_to_personal",
    //     data: {
    //       procedure: document,
    //       tracking,
    //     },
    //   });
    // }

    return tracking;
  }
}
