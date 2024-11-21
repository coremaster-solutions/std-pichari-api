import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { IUpdateGroupDto } from "../../domain/dtos";
import { IGroupsRepository } from "../../domain/repositories";
import { IGroupPermissionsRepository } from "@/group_permissions/domain/repositories";
import { IPermissionsRepository } from "@/permissions/domain/repositories";
import { prismaService } from "@/shared/infrastructure/db";

interface IRequest extends IUpdateGroupDto {
  id: string;
  permissionIds?: string[];
}
export class UpdateOneGroupService {
  constructor(
    private groupsRepository: IGroupsRepository,
    private permissionsRepository: IPermissionsRepository,
    private groupPermissionsRepository: IGroupPermissionsRepository
  ) {}
  async execute({ id, permissionIds, ...data }: IRequest): Promise<any> {
    const group = await this.groupsRepository.findById(id);

    if (!group) {
      throw new AppError({
        message: "El grupo no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const response = await this.groupsRepository.update(id, data);

    if (!response) {
      throw new AppError({
        message: "Error al editar el grupo",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

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

      const permissionIdsToUpdate = group.permissions?.filter(
        (groupPermission) =>
          permissionIds?.some(
            (permissionId) =>
              groupPermission.groupId === id &&
              permissionId === groupPermission.permissionId
          )
      );

      const permissionIdsToDelete = group.permissions?.filter(
        (groupPermission) =>
          !permissionIds?.some(
            (permissionId) =>
              groupPermission.groupId === id &&
              permissionId === groupPermission.permissionId
          )
      );
      const permissionIdsToCreate = permissionIds.filter(
        (permissionId) =>
          !permissionIdsToDelete?.some(
            (groupPermission) => permissionId === groupPermission.permissionId
          ) &&
          !permissionIdsToUpdate?.some(
            (groupPermission) => permissionId === groupPermission.permissionId
          )
      );

      if (permissionIdsToCreate && permissionIdsToCreate?.length > 0) {
        await Promise.all(
          permissionIdsToCreate.map(
            async (permissionId) =>
              await this.groupPermissionsRepository.create({
                groupId: group.id,
                permissionId,
              })
          )
        );
      }
      if (permissionIdsToDelete && permissionIdsToDelete?.length > 0) {
        await Promise.all(
          permissionIdsToDelete.map(
            async ({ groupId, permissionId }) =>
              await this.groupPermissionsRepository.deleteByGroupIdAndPermissionId(
                groupId,
                permissionId
              )
          )
        );
      }
      if (permissionIdsToUpdate && permissionIdsToUpdate?.length > 0)
        await Promise.all(
          permissionIdsToUpdate?.map(
            async ({ permissionId, ...groupPermission }) =>
              await this.groupPermissionsRepository.updateById(
                groupPermission.id,
                {
                  permissionId,
                }
              )
          )
        );
    } else {
      await this.groupPermissionsRepository.deleteByGroupId(group.id);
    }

    return response;
  }
}
