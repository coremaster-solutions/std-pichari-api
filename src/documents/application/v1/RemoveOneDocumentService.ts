import { DocumentModel } from "../../domain/models";
import { IDocumentRepository } from "../../domain/repositories";

interface IRequest {
  id: string;
}

export class RemoveOneDocumentService {
  constructor(private documentRepository: IDocumentRepository) {}

  async execute({ id }: IRequest): Promise<DocumentModel> {
    const response = await this.documentRepository.deleteById(id);

    return response;
  }
}
