import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { ICreateGroupDto } from "../../domain/dtos";
import { GroupModel } from "../../domain/models";
import { IGroupsRepository } from "../../domain/repositories";
import { IGroupPermissionsRepository } from "@/group_permissions/domain/repositories";
import { IPermissionsRepository } from "@/permissions/domain/repositories";

interface IRequest extends ICreateGroupDto {
  permissionIds?: string[];
}
export class CreateGroupService {
  constructor(
    private groupsRepository: IGroupsRepository,
    private permissionsRepository: IPermissionsRepository,
    private groupPermissionsRepository: IGroupPermissionsRepository
  ) {}
  async execute({ permissionIds, ...data }: IRequest): Promise<GroupModel> {
    if (permissionIds && permissionIds.length > 0) {
      const permissionsExists = await Promise.all(
        permissionIds.map(
          async (permissionId) =>
            await this.permissionsRepository.findById(permissionId)
        )
      );
      if (permissionsExists.some((permission) => permission == null)) {
        throw new AppError({
          message: "Error uno de ids de permisos no existe",
          statusCode: httpStatus.BAD_REQUEST,
        });
      }
    }

    const group = await this.groupsRepository.create(data);

    if (!group) {
      throw new AppError({
        message: "Error al crear el grupo",
        statusCode: httpStatus.BAD_REQUEST,
      });
    }

    if (permissionIds && permissionIds.length > 0) {
      await Promise.all(
        permissionIds.map(
          async (permissionId) =>
            await this.groupPermissionsRepository.create({
              groupId: group.id,
              permissionId,
            })
        )
      );
    }

    return group;
  }
}
