import {ICreateDocumentDto} from "@/documents/domain/dtos";
import {ProcedureTypeEnum, ShippingAverageEnum} from "@/documents/domain/enum";
import {DestinationProcedureModel, DocumentNumbersByType} from "@/documents/domain/models";
import {IDocumentRepository} from "@/documents/domain/repositories";
import {NotificationModel} from "@/notifications/domain/models";
import {INotificationRepository} from "@/notifications/domain/repositories";
import {IOfficeRepository} from "@/offices/domain/repositories";
import {IPersonalRepository} from "@/personals/domain/repositories";
import {AppError} from "@/shared/domain/models";
import {
    IGenerateRandomNumberProvider,
    IUploadFileProvider,
} from "@/shared/infrastructure/containers";
import {ITrackingDocumentRepository} from "@/tracking_documents/domain/repositories";

export interface ICreateDocumentServiceRequest extends ICreateDocumentDto {
    originOfficeId?: string;
    destinyOfficeId?: string;
    attentionPriority: string;
    copyDerivation: boolean;
    messageDerivation?: string;
    sentDestinations?: DestinationProcedureModel[];
}

export class CreateDocumentService {
    constructor(
        private documentRepository: IDocumentRepository,
        private officeRepository: IOfficeRepository,
        private personalRepository: IPersonalRepository,
        private generateRandomNumberProvider: IGenerateRandomNumberProvider,
        private uploadFileProvider: IUploadFileProvider,
        private notificationRepository: INotificationRepository,
        private trackingDocumentRepository: ITrackingDocumentRepository
    ) {
    }

    async execute({
          procedureNumber,
          documentUrl,
          destinyOfficeId,
          originOfficeId,
          attentionPriority,
          copyDerivation,
          messageDerivation,
          sentDestinations,
          ...data
      }: ICreateDocumentServiceRequest): Promise<any> {
        const documentExists = await this.documentRepository.findByDocumentNumber({
            documentNumber: data.documentNumber,
            documentTypeId: data.documentTypeId,
            shippingAverage: data.shippingAverage as ShippingAverageEnum
        });

        if (documentExists) {
            throw new AppError({
                message: `El documento con ese número ${data.documentNumber} ya existe`,
            });
        }

        const originOfficeExists = await this.officeRepository.findById(
            originOfficeId!
        );

        if (!originOfficeExists) {
            throw new AppError({
                message: `La oficina de origen con ese id: ${originOfficeId} no existe`,
            });
        }

        const officeExists = await this.officeRepository.findById(destinyOfficeId!);

        if (!officeExists) {
            throw new AppError({
                message: `La oficina de destino con ese id: ${destinyOfficeId} no existe`,
            });
        }

        const personalExists = await this.personalRepository.findById(
            data.creatorId ?? ""
        );

        if (!personalExists) {
            throw new AppError({
                message: `El personal que firma con ese id: ${data.creatorId} no existe`,
            });
        }

        const {personals, ...originOffice} = originOfficeExists;
        const {personals: destinyPersonals, ...destinyOffice} = officeExists;

        const documentResponse = await this.documentRepository.create({
            ...data,
            procedureType: data.procedureType ?? ProcedureTypeEnum.UN_SIGNED,
            procedureNumber:
                (await this.generateRandomNumberProvider.generateProcedureNumber()) +
                `.00${1}`,
            documentUrl,
        });

        if (!documentResponse) {
            throw new AppError({
                message: `Error al crear el documento`,
            });
        }

        const trackingInitial = await this.trackingDocumentRepository.create({
            attentionPriority,
            documentId: documentResponse.id,
            originOfficeId: originOffice.id,
            originPersonalId: data.creatorId,
            destinyOfficeId: destinyOffice.id,
            procedureNumber: documentResponse.procedureNumber,
            copyDerivation,
            message: messageDerivation,
            ...(sentDestinations && {
                sentDestinations: sentDestinations as any,
            }),
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

                throw new AppError({message: error.toString()});
            });

        if (!newDocumentUrl) {
            throw new AppError({message: "Error to moved document file "});
        }

        const documentUpdateResponse = await this.documentRepository.update(
            documentResponse?.id,
            {
                documentUrl: newDocumentUrl,
            }
        );

        if (!documentUpdateResponse) {
            throw new AppError({
                message: `Error al actualizar el documento`,
            });
        }

        if (data.shippingAverage === ShippingAverageEnum.INSTITUCIONAL) {

            let nextDocumentNumbers = (originOfficeExists?.nextDocumentNumbers
                ? [...originOfficeExists?.nextDocumentNumbers as any[]]
                : []) as DocumentNumbersByType[];
            const indexToUpdate = nextDocumentNumbers
                    .findIndex((value) => value.id === data.documentTypeId);

            const documentNumber = Number(data.documentNumber.split('-')[0] ?? 0) + 1;
            const nextNumber = documentNumber > 0 && documentNumber <= 9 ? `0${documentNumber}` : documentNumber.toString()
            const currentDocumentNumber = {
                id: data.documentTypeId,
                nextNumber
            }

            if(nextDocumentNumbers[indexToUpdate]) {
                nextDocumentNumbers[indexToUpdate] = currentDocumentNumber;
            } else {
                nextDocumentNumbers.push(currentDocumentNumber);
            }

            await this.officeRepository.update(originOfficeExists.id, {
                nextDocumentNumbers: (nextDocumentNumbers as any[]) ?? []
            });
        }

        let notifications: NotificationModel[] = [];
        if (destinyPersonals && destinyPersonals.length > 0) {
            await Promise.all(
                destinyPersonals.map(async (personal) => {
                    await this.notificationRepository.create({
                        personalId: personal.personalId,
                        officeId: destinyOffice.id,
                        data: trackingInitial as any,
                    });
                })
            );

            const last_notifications = await this.notificationRepository.findAll({
                officeId: destinyOffice.id,
                perPage: destinyPersonals.length,
            });
            notifications = last_notifications.data;
        }

        return {...documentUpdateResponse, notifications};
    }
}
