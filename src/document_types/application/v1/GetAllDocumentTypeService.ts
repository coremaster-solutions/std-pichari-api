import { IDocumentTypeRepository } from "@/document_types/domain/repositories";

interface IRequest {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
}
export class GetAllDocumentTypeService {
  constructor(private documentTypeRepository: IDocumentTypeRepository) {}

  async execute(queryData: IRequest): Promise<any> {
    const response = await this.documentTypeRepository.findAll(queryData);

    return {
      message: "Successful",
      code: "000000",
      data: response,
    };
  }
}
