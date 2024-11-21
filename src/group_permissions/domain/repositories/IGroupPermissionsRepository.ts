import { ICreateGroupPermissionDto, IUpdateGroupPermissionDto } from "../dtos";
import { GroupPermissionModel } from "../models";

export interface IGroupPermissionsRepository {
  create(data: ICreateGroupPermissionDto): Promise<GroupPermissionModel | null>;
  updateById(
    id: string,
    data: IUpdateGroupPermissionDto
  ): Promise<GroupPermissionModel | null>;
  deleteByGroupIdAndPermissionId(
    groupId: string,
    permissionId: string
  ): Promise<any>;
  deleteByGroupId(groupId: string): Promise<any>;
}
