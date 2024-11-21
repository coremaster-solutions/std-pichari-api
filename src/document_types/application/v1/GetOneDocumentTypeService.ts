import { DocumentTypeModel } from "@/document_types/domain/models";
import { IDocumentTypeRepository } from "@/document_types/domain/repositories";
import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";

interface IRequest {
  id: string;
}

export class GetOneDocumentTypeService {
  constructor(private documentTypeRepository: IDocumentTypeRepository) {}

  async execute({ id }: IRequest): Promise<DocumentTypeModel> {
    const response = await this.documentTypeRepository.findById(id);

    if (!response) {
      throw new AppError({
        message: "El tipo de documento no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    return response;
  }
}
