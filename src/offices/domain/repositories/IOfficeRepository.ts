import { IDataWithPagination } from "@/shared/infrastructure/db";
import { ICreateOfficeDto, IUpdateOfficeDto } from "../dtos";
import { StatusOfficeEnum } from "../enum";
import { OfficeModel } from "../models";
export interface IFindAllOffice {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: StatusOfficeEnum;
}

export interface IOfficeRepository {
  create(data: ICreateOfficeDto): Promise<OfficeModel>;
  update(id: string, data: IUpdateOfficeDto): Promise<OfficeModel>;
  findAll(params: IFindAllOffice): Promise<IDataWithPagination<OfficeModel[]>>;
  findById(id: string): Promise<OfficeModel | null>;
  deleteById(id: string): Promise<OfficeModel>;
  findByName(name: string): Promise<OfficeModel | null>;
}
