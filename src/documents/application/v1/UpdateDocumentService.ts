import { IUpdateDocumentDto } from "@/documents/domain/dtos";
import { DocumentModel } from "../../domain/models";
import { IDocumentRepository } from "../../domain/repositories";
import {
  IJobsProvider,
  IUploadFileProvider,
} from "@/shared/infrastructure/containers";

interface IRequest extends IUpdateDocumentDto {
  id: string;
}

export class UpdateDocumentService {
  constructor(
    private documentRepository: IDocumentRepository,
    private uploadFileProvider: IUploadFileProvider,
    private jobsProvider: IJobsProvider
  ) {}

  async execute({ id, ...data }: IRequest): Promise<DocumentModel> {
    const destinationDir = `uploads/documents/${new Date().getFullYear()}`;
    console.log(this.uploadFileProvider, destinationDir);

    const response = await this.documentRepository.update(id, data);

    await this.jobsProvider.add<DocumentModel>({
      type: "send_email_status_procedure",
      data: response,
    });

    return response;
  }
}
