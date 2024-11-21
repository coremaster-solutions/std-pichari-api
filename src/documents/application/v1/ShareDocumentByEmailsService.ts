import { IDocumentRepository } from "@/documents/domain/repositories";
import { AppError } from "@/shared/domain/models";
import { IJobsProvider } from "@/shared/infrastructure/containers";
import { ISendEmailShareDocumentService } from "./SendEmailShareDocumentService";

export interface IShareDocumentByEmailsService {
  subject: string;
  to: string[];
  message: string;
  documentId: string;
}
export class ShareDocumentByEmailsService {
  constructor(
    private documentRepository: IDocumentRepository,
    private jobsProvider: IJobsProvider
  ) {}

  async execute({
    subject,
    to,
    message,
    documentId,
  }: IShareDocumentByEmailsService): Promise<any> {
    const document = await this.documentRepository.findById(documentId);

    if (!document) {
      throw new AppError({
        message: `El documento no existe`,
      });
    }

    for (const email of to) {
      await this.jobsProvider.add<ISendEmailShareDocumentService>({
        type: "send_email_share_document",
        data: {
          procedure: document,
          subject,
          email,
          message,
        },
      });
    }

    return {
      message: `Enviando el mensaje ${to.length > 1 ? "a los" : "al"} correo${
        to.length > 1 ? "s" : ""
      }: ${to.join(",")}`,
    };
  }
}
