import {
  ICreatePermissionDto,
  IFindAllSimpleDto,
  IUpdatePermissionDto,
} from "../dtos";
import { PermissionModel } from "../models";

export interface IPermissionsRepository {
  findAllSimple(data: IFindAllSimpleDto): Promise<PermissionModel[]>;
  create(data: ICreatePermissionDto): Promise<PermissionModel>;
  update(id: string, data: IUpdatePermissionDto): Promise<PermissionModel>;
  findById(id: string): Promise<PermissionModel | null>;
  deleteById(id: string): Promise<PermissionModel>;
}
