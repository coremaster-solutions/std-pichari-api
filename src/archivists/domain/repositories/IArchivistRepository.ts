import { IDataWithPagination } from "@/shared/infrastructure/db";
import { ICreateArchivistDto, IUpdateArchivistDto } from "../dtos";
import { ArchivistModel } from "../models";
import { ArchivistTypeEnum } from "../enum";
export interface IFindAllArchivist {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  entityId?: string;
  entityType?: ArchivistTypeEnum;
}

export interface IArchivistRepository {
  create(data: ICreateArchivistDto): Promise<ArchivistModel>;
  update(id: string, data: IUpdateArchivistDto): Promise<ArchivistModel>;
  findAll(
    params: IFindAllArchivist
  ): Promise<IDataWithPagination<ArchivistModel[]>>;
  findById(id: string): Promise<ArchivistModel | null>;
  deleteById(id: string): Promise<ArchivistModel>;
  findByEntityIdAndDefault(entityId: string): Promise<ArchivistModel | null>;
}
