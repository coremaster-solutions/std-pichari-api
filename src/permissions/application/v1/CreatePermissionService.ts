import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { ICreatePermissionDto } from "../../domain/dtos";
import { PermissionModel } from "../../domain/models";
import { IPermissionsRepository } from "../../domain/repositories";

interface IRequest extends ICreatePermissionDto {}
export class CreatePermissionService {
  constructor(private permissionsRepository: IPermissionsRepository) {}
  async execute(data: IRequest): Promise<PermissionModel> {
    const permission = await this.permissionsRepository.create(data);

    if (!permission) {
      throw new AppError({
        message: "Error al crear el permiso",
        statusCode: httpStatus.BAD_REQUEST,
      });
    }

    return permission;
  }
}
