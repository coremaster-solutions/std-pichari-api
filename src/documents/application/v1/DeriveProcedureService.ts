import { IAttachmentFileRepository } from "@/attachment_files/domain/repositories";
import { NotificationModel } from "@/notifications/domain/models";
import { INotificationRepository } from "@/notifications/domain/repositories";
import { IOfficeRepository } from "@/offices/domain/repositories";
import { IPersonalRepository } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import {
  IJobsProvider,
  IUploadFileProvider,
} from "@/shared/infrastructure/containers";
import { IUpdateTrackingDto } from "@/tracking_documents/domain/dtos";
import { TrackingDocumentModel } from "@/tracking_documents/domain/models";
import { ITrackingDocumentRepository } from "@/tracking_documents/domain/repositories";
import { AttachmentType, StatusProcedure } from "@prisma/client";
import httpStatus from "http-status";
import { DestinationProcedureModel } from "../../domain/models";
import { ISendEmailStatusProcedureServiceRequest } from "./SendEmailStatusProcedureService";
import { ISendWhatsAppStatusProcedureServiceRequest } from "./SendWhatsAppStatusProcedureService";
import { IDocumentRepository } from "@/documents/domain/repositories";

export interface IDeriveProcedureRequest
  extends Omit<IUpdateTrackingDto, "sentDestinations"> {
  id: string;
  sentDestinations?: DestinationProcedureModel[];
  attachments?: string[];
  originOfficeId?: string;
  originPersonalId?: string;
  destinyPersonalId?: string;
  destinyOfficeId?: string;
  messageDerivation?: string;
  newDocumentUrl?: string;
}

export class DeriveProcedureService {
  constructor(
    private uploadFileProvider: IUploadFileProvider,
    private trackingDocumentRepository: ITrackingDocumentRepository,
    private personalRepository: IPersonalRepository,
    private attachmentFileRepository: IAttachmentFileRepository,
    private jobsProvider: IJobsProvider,
    private officeRepository: IOfficeRepository,
    private notificationRepository: INotificationRepository,
    private documentRepository: IDocumentRepository
  ) {}

  async execute({
    id,
    messageDerivation,
    attachments,
    procedureNumber,
    newDocumentUrl,
    ...data
  }: IDeriveProcedureRequest): Promise<
    TrackingDocumentModel & { notifications: NotificationModel[] }
  > {
    const currentTrackingProcedure =
      await this.trackingDocumentRepository.findById(id);

    if (!currentTrackingProcedure) {
      throw new AppError({
        message: "El seguimiento del documento no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }
    const personal = await this.personalRepository.findById(
      data.originPersonalId ?? ""
    );

    if (!personal) {
      throw new AppError({
        message: "El personal no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const officeExists = await this.officeRepository.findById(
      data.destinyOfficeId!
    );

    if (!officeExists) {
      throw new AppError({
        message: `La oficina de destino con ese id: ${data.destinyOfficeId} no existe`,
      });
    }

    const destinyPersonalSent = data.sentDestinations
      ?.filter((data) => data.model === "personals")
      .at(0);
    let destinyPersonalFirst = null;
    if (destinyPersonalSent) {
      destinyPersonalFirst = await this.personalRepository.findById(
        destinyPersonalSent.value
      );

      if (!destinyPersonalFirst) {
        throw new AppError({
          message: "El personal a enviar no existe",
          statusCode: httpStatus.NOT_FOUND,
        });
      }
    }
    console.log(
      "data.originOfficeId",
      data.originOfficeId ?? currentTrackingProcedure.destinyOfficeId!
    );

    let tracking: TrackingDocumentModel = currentTrackingProcedure;

    tracking = await this.trackingDocumentRepository.create({
      procedureNumber: procedureNumber as string,
      documentId: currentTrackingProcedure?.documentId as string,
      message: messageDerivation as string,
      statusProcedure: StatusProcedure.PENDING_RECEPTION,
      originOfficeId:
        data.originOfficeId ?? currentTrackingProcedure.destinyOfficeId!,
      originPersonalId: data.originPersonalId,
      destinyOfficeId: data.destinyOfficeId,
      destinyPersonalId: data.destinyPersonalId
        ? data.destinyPersonalId
        : undefined,
      attentionPriority: data.attentionPriority as string,
      ...(data.sentDestinations && {
        sentDestinations: data.sentDestinations as any,
      }),
      derivedData: {
        originOfficeId: currentTrackingProcedure.originOfficeId,
        originPersonalId: currentTrackingProcedure.originPersonalId,
        destinyOfficeId: currentTrackingProcedure.destinyOfficeId,
        destinyPersonalId: currentTrackingProcedure.destinyPersonalId,
      },
    });
    await this.trackingDocumentRepository.update(id, {
      statusProcedure: StatusProcedure.ATTENDED_DERIVED,
      destinyPersonalId: currentTrackingProcedure?.destinyPersonalId,
    });

    const destinationDir = `uploads/documents/${new Date().getFullYear()}`;

    const promiseAttachments =
      !!attachments && attachments?.length > 0
        ? Promise.all(
            attachments?.map(
              async (file) =>
                await this.uploadFileProvider.moveFileToPath(
                  file,
                  destinationDir
                )
            )
          )
        : undefined;

    if (!!attachments && attachments?.length > 0 && !promiseAttachments) {
      throw new AppError({ message: "Error to moved document file " });
    }

    const newAttachments = await promiseAttachments;

    if (newAttachments && newAttachments?.length > 0) {
      const promiseAddAttachments = await Promise.all(
        newAttachments.map(async (path) => {
          await this.attachmentFileRepository.create({
            entityId: tracking.id,
            entityType: AttachmentType.TRACKING_DOCUMENT,
            fileUrl: path,
          });
        })
      );
      if (
        !!newAttachments &&
        newAttachments?.length > 0 &&
        !promiseAddAttachments
      ) {
        throw new AppError({ message: "Error to created attachment files" });
      }
    }

    if (newDocumentUrl) {
      const destinationDir = `uploads/documents/${new Date().getFullYear()}`;

      const newServerDocumentUrl = await this.uploadFileProvider
        .moveFileToPath(newDocumentUrl!, destinationDir)
        .catch((error) => {
          console.log("moveFileToPath ERROR::: ", error);

          throw new AppError({ message: error.toString() });
        });

      if (!newServerDocumentUrl) {
        throw new AppError({ message: "Error to moved document file " });
      }
      await this.uploadFileProvider
        .removeFileByPath(
          currentTrackingProcedure.document?.documentUrl as string
        )
        .catch((error) => {
          console.log("removeFileByPath ERROR:::", error);

          throw new AppError({ message: error.toString() });
        });

      await this.documentRepository.update(
        currentTrackingProcedure?.documentId!,
        {
          documentUrl: newServerDocumentUrl,
        }
      );
    }

    if (currentTrackingProcedure.document?.citizenId) {
      await this.jobsProvider.add<ISendEmailStatusProcedureServiceRequest>({
        type: "send_email_status_procedure",
        data: {
          procedure: currentTrackingProcedure.document,
          tracking,
        },
      });

      await this.jobsProvider.add<ISendWhatsAppStatusProcedureServiceRequest>({
        type: "send_whatsapp_status_procedure",
        data: {
          procedure: currentTrackingProcedure.document,
          tracking,
        },
      });
    }

    // if (currentTrackingProcedure?.document?.creator) {
    //   this.jobsProvider.add<ISendWhatsAppStatusProcedureToPersonalService>({
    //     type: "send_whatsapp_status_procedure_to_personal",
    //     data: {
    //       procedure: currentTrackingProcedure?.document,
    //       tracking,
    //     },
    //   });
    // }

    let notifications: NotificationModel[] = [];
    if (officeExists.personals && officeExists.personals.length > 0) {
      await Promise.all(
        officeExists.personals.map(async (personal) => {
          await this.notificationRepository.create({
            personalId: personal.personalId,
            officeId: officeExists.id,
            data: tracking as any,
          });
        })
      ).catch((error) => console.log("Create notification error", error));

      const last_notifications = await this.notificationRepository.findAll({
        officeId: officeExists.id,
        perPage: officeExists?.personals.length,
      });
      notifications = last_notifications.data;
    }

    return { ...tracking, notifications };
  }
}
