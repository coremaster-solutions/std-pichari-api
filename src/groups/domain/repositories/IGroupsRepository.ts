import { IDataWithPagination } from "@/shared/infrastructure/db";
import {
  ICreateGroupDto,
  IFindAllDto,
  IFindAllSimpleDto,
  IUpdateGroupDto,
} from "../dtos";
import { GroupModel } from "../models";

export interface IGroupsRepository {
  findAll(queryData: IFindAllDto): Promise<IDataWithPagination<GroupModel[]>>;
  findAllSimple(data: IFindAllSimpleDto): Promise<GroupModel[]>;
  create(data: ICreateGroupDto): Promise<GroupModel>;
  update(id: string, data: IUpdateGroupDto): Promise<GroupModel>;
  findById(id: string): Promise<GroupModel | null>;
  deleteById(id: string): Promise<GroupModel>;
}
