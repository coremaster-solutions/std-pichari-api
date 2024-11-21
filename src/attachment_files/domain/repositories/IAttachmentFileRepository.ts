import { IDataWithPagination } from "@/shared/infrastructure/db";
import { ICreateAttachmentFileDto, IUpdateAttachmentFileDto } from "../dtos";
import { AttachmentFileModel } from "../models";
export interface IFindAllAttachmentFile {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  entityId?: string;
  entityType?: string;
}

export interface IAttachmentFileRepository {
  create(data: ICreateAttachmentFileDto): Promise<AttachmentFileModel>;
  update(
    id: string,
    data: IUpdateAttachmentFileDto
  ): Promise<AttachmentFileModel>;
  findAll(
    params: IFindAllAttachmentFile
  ): Promise<AttachmentFileModel[] | undefined>;
  findById(id: string): Promise<AttachmentFileModel | null>;
  deleteById(id: string): Promise<AttachmentFileModel>;
}
