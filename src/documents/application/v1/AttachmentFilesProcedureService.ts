import { IAttachmentFileRepository } from "@/attachment_files/domain/repositories";
import { IUpdateDocumentDto } from "@/documents/domain/dtos";
import { AppError } from "@/shared/domain/models";
import { IUploadFileProvider } from "@/shared/infrastructure/containers";
import { AttachmentType } from "@prisma/client";
import httpStatus from "http-status";
import { IDocumentRepository } from "../../domain/repositories";

export interface IAttachmentFilesProcedureRequest extends IUpdateDocumentDto {
  documentId: string;
  attachments: string[];
}

export class AttachmentFileProcedureService {
  constructor(
    private documentRepository: IDocumentRepository,
    private uploadFileProvider: IUploadFileProvider,
    private attachmentFileRepository: IAttachmentFileRepository
  ) {}

  async execute({
    documentId,
    attachments,
  }: IAttachmentFilesProcedureRequest): Promise<any> {
    if (attachments.length < 0) {
      throw new AppError({
        message: "Es necesario enviar al menos 1 archivo",
      });
    }

    const procedure = await this.documentRepository.findById(documentId);

    if (!procedure) {
      throw new AppError({
        message: "El documento no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const destinationDir = `uploads/documents/${new Date().getFullYear()}`;

    const promiseAttachments = Promise.all(
      attachments?.map(
        async (file) =>
          await this.uploadFileProvider.moveFileToPath(file, destinationDir)
      )
    );

    if (!promiseAttachments) {
      throw new AppError({ message: "Error to moved document file " });
    }

    const newAttachments = await promiseAttachments;

    const promiseAddAttachments = await Promise.all(
      newAttachments.map(async (path) => {
        await this.attachmentFileRepository.create({
          entityId: procedure.id,
          entityType: AttachmentType.DOCUMENT,
          fileUrl: path,
        });
      })
    );

    if (!promiseAddAttachments) {
      throw new AppError({ message: "Error to add attachment files" });
    }

    const attachmentFiles = await this.attachmentFileRepository.findAll({
      entityId: procedure.id,
    });

    return {
      ...procedure,
      attachments: attachmentFiles,
    };
  }
}
