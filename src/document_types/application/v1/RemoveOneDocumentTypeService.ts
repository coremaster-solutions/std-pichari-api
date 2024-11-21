import { DocumentTypeModel } from "@/document_types/domain/models";
import { IDocumentTypeRepository } from "@/document_types/domain/repositories";

interface IRequest {
  id: string;
}

export class RemoveOneDocumentTypeService {
  constructor(private documentTypeRepository: IDocumentTypeRepository) {}

  async execute({ id }: IRequest): Promise<DocumentTypeModel> {
    const response = await this.documentTypeRepository.deleteById(id);

    return response;
  }
}
