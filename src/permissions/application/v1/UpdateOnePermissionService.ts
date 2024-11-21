import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { IPermissionsRepository } from "../../domain/repositories";
import { IUpdatePermissionDto } from "../../domain/dtos";

interface IRequest extends IUpdatePermissionDto {
  id: string;
}
export class UpdateOnePermissionService {
  constructor(private permissionsRepository: IPermissionsRepository) {}
  async execute({ id, ...data }: IRequest): Promise<any> {
    const permission = await this.permissionsRepository.findById(id);

    if (!permission) {
      throw new AppError({
        message: "El permiso no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const response = await this.permissionsRepository.update(id, data);

    if (!response) {
      throw new AppError({
        message: "Error al editar el permiso",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    return response;
  }
}
