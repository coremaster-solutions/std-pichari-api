import { IAttachmentFileRepository } from "@/attachment_files/domain/repositories";
import { ICreateDocumentWithCitizenRequestDto } from "@/documents/domain/dtos";
import {
  ProcedureTypeEnum,
  ShippingAverageEnum,
} from "@/documents/domain/enum";
import { DocumentModel } from "@/documents/domain/models";
import { IDocumentRepository } from "@/documents/domain/repositories";
import { NotificationModel } from "@/notifications/domain/models";
import { INotificationRepository } from "@/notifications/domain/repositories";
import { IOfficeRepository } from "@/offices/domain/repositories";
import { Envs } from "@/shared/config";
import { AppError } from "@/shared/domain/models";
import {
  IGenerateRandomNumberProvider,
  IJobsProvider,
  IUploadFileProvider,
} from "@/shared/infrastructure/containers";
import { ITrackingDocumentRepository } from "@/tracking_documents/domain/repositories";
import { AttachmentType } from "@prisma/client";

export class CreateDocumentCitizenService {
  constructor(
    private documentRepository: IDocumentRepository,
    private officeRepository: IOfficeRepository,
    private generateRandomNumberProvider: IGenerateRandomNumberProvider,
    private uploadFileProvider: IUploadFileProvider,
    private jobsProvider: IJobsProvider,
    private notificationRepository: INotificationRepository,
    private trackingDocumentRepository: ITrackingDocumentRepository,
    private attachmentFileRepository: IAttachmentFileRepository
  ) {}

  async execute({
    documentUrl,
    attachmentDocumentUrl,
    citizen,
    originOfficeId,
    destinyOfficeId,
    attachments,
    ...data
  }: ICreateDocumentWithCitizenRequestDto): Promise<any> {
    const documentExists = await this.documentRepository.findByDocumentNumber({
      documentNumber: data.documentNumber,
      documentTypeId: data.documentTypeId,
      shippingAverage: ShippingAverageEnum.TABLE_OF_PARTS,
    });

    if (documentExists) {
      throw new AppError({
        message: `El documento con ese número ${data.documentNumber} ya existe`,
      });
    }

    const officeExists = await this.officeRepository.findById(
      destinyOfficeId || Envs.PARTS_TABLE_OFFICE_ID
    );

    if (!officeExists) {
      throw new AppError({
        message: `La oficina de destino con ese id: ${destinyOfficeId} no existe`,
      });
    }

    const citizenExists = await this.documentRepository.findByOneCitizen(
      citizen.documentType,
      citizen.documentNumber
    );

    let citizenData = citizenExists;
    if (!citizenExists) {
      citizenData = await this.documentRepository.createCitizen(citizen);
    }

    citizenData = await this.documentRepository.updateCitizen(
      citizenData?.id!,
      citizen
    );
    const { personals: destinyPersonals, ...destinyOffice } = officeExists;

    const documentResponse = await this.documentRepository.create({
      ...data,
      procedureType: data.procedureType ?? ProcedureTypeEnum.UN_SIGNED,
      procedureNumber:
        (await this.generateRandomNumberProvider.generateProcedureNumber()) +
        `.00${1}`,
      documentUrl,
      attachmentDocumentUrl,
      citizenId: citizenData.id,
    });

    if (!documentResponse) {
      throw new AppError({
        message: `Error al crear el documento`,
      });
    }

    const trackingInitial = await this.trackingDocumentRepository.create({
      documentId: documentResponse.id,
      destinyOfficeId: destinyOffice.id,
      procedureNumber: documentResponse.procedureNumber,
    });

    if (!trackingInitial) {
      throw new AppError({
        message: `Error al crear el seguimiento inicial`,
      });
    }

    const destinationDir = `uploads/documents/${new Date().getFullYear()}`;

    const newDocumentUrl = await this.uploadFileProvider
      .moveFileToPath(documentUrl!, destinationDir)
      .catch((error) => {
        console.log("ERROR", error);

        throw new AppError({ message: error.toString() });
      });

    if (!newDocumentUrl) {
      throw new AppError({ message: "Error to moved document file " });
    }

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
            entityId: documentResponse.id,
            entityType: AttachmentType.DOCUMENT,
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

    const documentUpdateResponse = await this.documentRepository.update(
      documentResponse.id,
      {
        documentUrl: newDocumentUrl,
      }
    );

    if (!documentUpdateResponse) {
      throw new AppError({
        message: `Error al actualizar el documento`,
      });
    }

    if (!documentUpdateResponse.creatorId) {
      await this.jobsProvider.add<DocumentModel>({
        type: "send_email_citizen_procedure",
        data: documentUpdateResponse,
      });

      await this.jobsProvider.add<DocumentModel>({
        type: "send_whatsapp_create_procedure",
        data: documentUpdateResponse,
      });
    }

    let notifications: NotificationModel[] = [];
    if (officeExists.personals && officeExists.personals.length > 0) {
      await Promise.all(
        officeExists.personals.map(async (personal) => {
          await this.notificationRepository.create({
            personalId: personal.personalId,
            officeId: officeExists.id,
            data: trackingInitial as any,
          });
        })
      );

      const last_notifications = await this.notificationRepository.findAll({
        officeId: officeExists.id,
        perPage: officeExists?.personals.length,
      });
      notifications = last_notifications.data;
    }

    return {
      ...documentUpdateResponse,
      citizen: citizenData,
      notifications,
    };
  }
}
