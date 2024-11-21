import { IDocumentRepository } from "@/documents/domain/repositories";
import { StatusPersonalEnum } from "@/personals/domain/enum";
import { IPersonalRepository } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import { ITrackingDocumentRepository } from "@/tracking_documents/domain/repositories";
import { LeaveOfficeToPersonalService } from "./LeaveOfficeToPersonalService";

interface IRequest {
  currentPersonalId: string;
  personalIdToDelegate: string;
}
export class DelegateOfficeToPersonalService {
  constructor(
    private personalRepository: IPersonalRepository,
    private documentRepository: IDocumentRepository,
    private documentTracking: ITrackingDocumentRepository,
    private delegateOfficeToPersonalService: LeaveOfficeToPersonalService
  ) {}
  async execute({
    currentPersonalId,
    personalIdToDelegate,
  }: IRequest): Promise<any> {
    try {
      const delegateOffice = await this.delegateOfficeToPersonalService.execute(
        {
          currentPersonalId,
          personalIdToLeave: personalIdToDelegate,
        }
      );

      if (delegateOffice.code !== "000000") {
        throw new AppError({
          message: "No se pudo delegar a cargo la oficina",
        });
      }

      await this.personalRepository.update(currentPersonalId, {
        status: StatusPersonalEnum.INACTIVE,
      });

      const documents =
        await this.documentRepository.findAllDocumentsByCreatorId(
          currentPersonalId
        );
      const documentIds = documents.map((doc) => doc.id);
      for (const documentId of documentIds) {
        await this.documentRepository.update(documentId, {
          creatorId: personalIdToDelegate,
        });
      }

      const documentsTracking =
        await this.documentTracking.findAllTrackingDocumentsByDestinyPersonalId(
          currentPersonalId
        );
      const documentTrackingIds = documentsTracking.map((doc) => doc.id);
      for (const trackingId of documentTrackingIds) {
        await this.documentTracking.update(trackingId, {
          destinyPersonalId: personalIdToDelegate,
        });
      }

      return {
        message: "Successful",
        code: "000000",
        data: {
          documents: `Cantidad documentos (${documents.length}) del personal delegado`,
          trackingDocuments: `Cantidad de seguimientos de trámites (${documentsTracking.length}) del personal delegado`,
        },
      };
    } catch (error: any) {
      console.log("ERROR DelegateOfficeToPersonalService:::: ", error.message);
      if (error instanceof AppError) {
        throw new AppError({
          message: error.message,
        });
      }
      throw new AppError({
        message: "No se pudo dejar a cargo la oficina",
      });
    }

    // Delegar a cargo la oficina
    // BODY -> personalID parent
    //      -> personalID child
    // Inhabilitar usuario que va dejar la entidad
    // Actualizar su id de creator (documento) y destinyPersonalId (Trámites actuales "seguimiento"), actualizar el nuevo campo previousDestinyPersonalId
    // Solo actualizar el grupo y la position -> guardar los datos anteriores (grupo y la position) de que va ser delegado (personalIdToLeave)
  }
}
