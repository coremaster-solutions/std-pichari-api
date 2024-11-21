import { ICreatePersonalDto, IUpdatePersonalDto } from "../dtos";
import { RoleType, StatusPersonalEnum } from "../enum";
import { PersonalModel } from "../models";
import { IDataWithPagination } from "@/shared/infrastructure/db";

export interface IFindAllPersonals {
  page?: number;
  perPage?: number;
  term?: string;
  role?: string;
  dateFrom?: string;
  dateTo?: string;
  officeId?: string;
  status?: StatusPersonalEnum;
}

export interface IPersonalRepository {
  create(data: ICreatePersonalDto): Promise<Omit<PersonalModel, "password">>;
  update(
    id: string,
    data: IUpdatePersonalDto
  ): Promise<Omit<PersonalModel, "password">>;
  findAll(
    params: IFindAllPersonals
  ): Promise<IDataWithPagination<Omit<PersonalModel, "password">[]>>;
  findByEmail(email: string): Promise<PersonalModel | null>;
  findByUsername(username: string): Promise<PersonalModel | null>;
  findById(id: string): Promise<Omit<PersonalModel, "password"> | null>;
  deleteById(id: string): Promise<Omit<PersonalModel, "password">>;
}
