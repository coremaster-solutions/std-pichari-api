import { IFindOneWithCitizen } from "@/documents/domain/dtos";
import { DocumentModel } from "../../domain/models";
import { IDocumentRepository } from "../../domain/repositories";
import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { IAttachmentFileRepository } from "@/attachment_files/domain/repositories";
import { AttachmentFileModel } from "@/attachment_files/domain/models";
import { ITrackingDocumentRepository } from "@/tracking_documents/domain/repositories";

interface IRequest extends IFindOneWithCitizen {
  withAttachments?: string;
}

export class GetOneDocumentWithAllTrackingsService {
  constructor(
    private documentRepository: IDocumentRepository,
    private attachmentFileRepository: IAttachmentFileRepository // private trackingDocumentRepository: ITrackingDocumentRepository
  ) {}

  async execute(
    params: IRequest
  ): Promise<DocumentModel & { attachments: AttachmentFileModel[] }> {
    const response = await this.documentRepository.findByOneWithTrackings(
      params
    );

    if (!response) {
      throw new AppError({
        message: "El documento no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }
    let attachments = [] as AttachmentFileModel[];
    if (params.withAttachments) {
      let resultDocuments = await this.attachmentFileRepository.findAll({
        entityId: response.id,
      });
      let resultTrackings = await Promise.all(
        response.trackings && response.trackings.length > 0
          ? response.trackings?.map(
              async (t) =>
                await this.attachmentFileRepository.findAll({
                  entityId: t.id,
                })
            )
          : []
      );
      attachments = [
        ...(resultDocuments as AttachmentFileModel[]),
        ...(resultTrackings.flatMap((x) => x) as AttachmentFileModel[]),
      ];
    }

    return { ...response, attachments };
  }
}
