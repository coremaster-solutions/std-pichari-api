import { StatusDocumentEnum } from "@/documents/domain/enum";
import { IPersonalRepository } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import { IJobsProvider } from "@/shared/infrastructure/containers";
import { ITrackingDocumentRepository } from "@/tracking_documents/domain/repositories";
import { TrackingDocument } from "@prisma/client";
import httpStatus from "http-status";
import { IDocumentRepository } from "../../domain/repositories";
import { ISendEmailStatusProcedureServiceRequest } from "./SendEmailStatusProcedureService";
import { ISendWhatsAppStatusProcedureServiceRequest } from "./SendWhatsAppStatusProcedureService";
import { ISendWhatsAppStatusProcedureToPersonalService } from "./SendWhatsAppStatusProcedureToPersonalService";
import { INotificationRepository } from "@/notifications/domain/repositories";

export interface IReceiveProcedureRequest {
  documentId: string;
  destinyPersonalId: string;
}

export class ReceiveProcedureService {
  constructor(
    private personalRepository: IPersonalRepository,
    private trackingDocumentRepository: ITrackingDocumentRepository,
    private jobsProvider: IJobsProvider,
    private notificationRepository: INotificationRepository
  ) {}

  async execute({
    documentId,
    destinyPersonalId,
  }: IReceiveProcedureRequest): Promise<TrackingDocument> {
    const procedure = await this.trackingDocumentRepository.findById(
      documentId
    );

    if (!procedure) {
      throw new AppError({
        message: "El documento no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }
    const personal = await this.personalRepository.findById(
      destinyPersonalId ?? ""
    );

    if (!personal) {
      throw new AppError({
        message: "El personal no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const procedureReceive = await this.trackingDocumentRepository.update(
      documentId,
      {
        statusProcedure: StatusDocumentEnum.IN_PROGRESS,
        destinyPersonalId: personal.id,
      }
    );

    await this.notificationRepository.deleteManyByProcedureNumber(
      procedure?.procedureNumber! ?? ""
    );

    if (procedure?.document?.citizenId) {
      await this.jobsProvider.add<ISendEmailStatusProcedureServiceRequest>({
        type: "send_email_status_procedure",
        data: {
          procedure: procedure?.document,
          tracking: procedureReceive,
        },
      });

      await this.jobsProvider.add<ISendWhatsAppStatusProcedureServiceRequest>({
        type: "send_whatsapp_status_procedure",
        data: {
          procedure: procedure?.document,
          tracking: procedureReceive,
        },
      });
    }

    // if (procedure?.document?.creator) {
    //   await this.jobsProvider.add<ISendWhatsAppStatusProcedureToPersonalService>(
    //     {
    //       type: "send_whatsapp_status_procedure_to_personal",
    //       data: {
    //         procedure: procedure?.document,
    //         tracking: procedureReceive,
    //       },
    //     }
    //   );
    // }

    return procedureReceive;
  }
}
