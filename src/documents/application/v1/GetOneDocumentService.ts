import { DocumentModel } from "../../domain/models";
import { IDocumentRepository } from "../../domain/repositories";
import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";

interface IRequest {
  id: string;
}

export class GetOneDocumentService {
  constructor(private documentRepository: IDocumentRepository) {}

  async execute({ id }: IRequest): Promise<DocumentModel> {
    const response = await this.documentRepository.findById(id);

    if (!response) {
      throw new AppError({
        message: "El documento no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    return response;
  }
}
