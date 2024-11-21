import { IDataWithPagination } from "@/shared/infrastructure/db";
import { ICreateDocumentTypeDto, IUpdateDocumentTypeDto } from "../dtos";
import { DocumentTypeModel } from "../models";
import { DocumentTypeCategory } from "@prisma/client";
export interface IFindAllDocumentType {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  category?: DocumentTypeCategory;
}

export interface IDocumentTypeRepository {
  create(data: ICreateDocumentTypeDto): Promise<DocumentTypeModel>;
  update(id: string, data: IUpdateDocumentTypeDto): Promise<DocumentTypeModel>;
  findAll(
    params: IFindAllDocumentType
  ): Promise<IDataWithPagination<DocumentTypeModel[]>>;
  findById(id: string): Promise<DocumentTypeModel | null>;
  deleteById(id: string): Promise<DocumentTypeModel>;
}
