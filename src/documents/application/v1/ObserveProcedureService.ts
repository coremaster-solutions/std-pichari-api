import { IUpdateDocumentDto } from "@/documents/domain/dtos";
import { IOfficeRepository } from "@/offices/domain/repositories";
import { AppError } from "@/shared/domain/models";
import { IJobsProvider } from "@/shared/infrastructure/containers";
import { TrackingDocumentModel } from "@/tracking_documents/domain/models";
import { ITrackingDocumentRepository } from "@/tracking_documents/domain/repositories";
import { StatusProcedure } from "@prisma/client";
import httpStatus from "http-status";
import { ISendEmailStatusProcedureServiceRequest } from "./SendEmailStatusProcedureService";
import { ISendWhatsAppStatusProcedureServiceRequest } from "./SendWhatsAppStatusProcedureService";
import { ISendWhatsAppStatusProcedureToPersonalService } from "./SendWhatsAppStatusProcedureToPersonalService";

export interface IObserveProcedureRequest extends IUpdateDocumentDto {
  documentId: string;
  messageObserve?: string;
  procedureNumber?: string;
}

export class ObserveProcedureService {
  constructor(
    private trackingDocumentRepository: ITrackingDocumentRepository,
    private jobsProvider: IJobsProvider,
    private officeRepository: IOfficeRepository
  ) {}

  async execute({
    documentId,
    messageObserve,
  }: IObserveProcedureRequest): Promise<TrackingDocumentModel> {
    const procedure = await this.trackingDocumentRepository.findById(
      documentId
    );

    if (!procedure) {
      throw new AppError({
        message: "El documento no existe",
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

    const tracking = await this.trackingDocumentRepository.update(documentId, {
      message: messageObserve,
      statusProcedure: StatusProcedure.OBSERVED,
    });

    if (tracking.document?.citizenId) {
      await this.jobsProvider.add<ISendEmailStatusProcedureServiceRequest>({
        type: "send_email_status_procedure",
        data: {
          procedure: procedure?.document!,
          tracking,
        },
      });

      await this.jobsProvider.add<ISendWhatsAppStatusProcedureServiceRequest>({
        type: "send_whatsapp_status_procedure",
        data: {
          procedure: procedure?.document!,
          tracking,
        },
      });
    }

    // if (procedure?.document?.creator) {
    //   this.jobsProvider.add<ISendWhatsAppStatusProcedureToPersonalService>({
    //     type: "send_whatsapp_status_procedure_to_personal",
    //     data: {
    //       procedure: procedure?.document,
    //       tracking,
    //     },
    //   });
    // }

    return tracking;
  }
}
