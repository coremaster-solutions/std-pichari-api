import { IUpdateDocumentDto } from "@/documents/domain/dtos";
import { AppError } from "@/shared/domain/models";
import { IJobsProvider } from "@/shared/infrastructure/containers";
import { TrackingDocumentModel } from "@/tracking_documents/domain/models";
import { ITrackingDocumentRepository } from "@/tracking_documents/domain/repositories";
import httpStatus from "http-status";
import { IDocumentRepository } from "../../domain/repositories";
import { ISendEmailStatusProcedureServiceRequest } from "./SendEmailStatusProcedureService";
import { ISendWhatsAppStatusProcedureServiceRequest } from "./SendWhatsAppStatusProcedureService";

export interface IUnarchiveProcedureServiceRequest extends IUpdateDocumentDto {
  trackingId: string;
}

export class UnarchiveProcedureService {
  constructor(
    private documentRepository: IDocumentRepository,
    private trackingDocumentRepository: ITrackingDocumentRepository,
    private jobsProvider: IJobsProvider
  ) {}

  async execute({
    trackingId,
  }: IUnarchiveProcedureServiceRequest): Promise<TrackingDocumentModel> {
    const procedure = await this.trackingDocumentRepository.findById(
      trackingId
    );

    if (!procedure) {
      throw new AppError({
        message: "El seguimiento del documento no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const tracking = await this.trackingDocumentRepository.update(trackingId, {
      statusProcedure: procedure.previousStatusProcedure!,
      message: procedure.previousMessage,
      previousMessage: null,
      previousStatusProcedure: null,
    });

    const document = await this.documentRepository.update(
      tracking?.documentId ?? "",
      {
        archivistId: null,
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

    return tracking;
  }
}
