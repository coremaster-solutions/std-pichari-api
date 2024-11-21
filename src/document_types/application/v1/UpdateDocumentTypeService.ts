import { DocumentTypeModel } from "@/document_types/domain/models";
import { IDocumentTypeRepository } from "@/document_types/domain/repositories";
import { Prisma } from "@prisma/client";

interface IRequest extends Prisma.DocumentTypeUpdateInput {
  id: string;
}

export class UpdateDocumentTypeService {
  constructor(private documentTypeRepository: IDocumentTypeRepository) {}

  async execute({ id, ...data }: IRequest): Promise<DocumentTypeModel> {
    const response = await this.documentTypeRepository.update(id, data);

    return response;
  }
}
