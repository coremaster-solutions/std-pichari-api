import { DocumentTypeModel } from "@/document_types/domain/models";
import { IDocumentTypeRepository } from "@/document_types/domain/repositories";
import { Prisma } from "@prisma/client";

interface IRequest extends Prisma.DocumentTypeCreateInput {
  creatorId: string;
}

export class CreateDocumentTypeService {
  constructor(private documentTypeRepository: IDocumentTypeRepository) {}

  async execute(data: IRequest): Promise<DocumentTypeModel> {
    const response = await this.documentTypeRepository.create(data);

    return response;
  }
}
