import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { IPermissionsRepository } from "../../domain/repositories";

interface IRequest {
  id: string;
}
export class DeleteOnePermissionService {
  constructor(private permissionsRepository: IPermissionsRepository) {}
  async execute({ id }: IRequest): Promise<any> {
    const permission = await this.permissionsRepository.findById(id);

    if (!permission) {
      throw new AppError({
        message: "El permiso no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }
    const response = await this.permissionsRepository.deleteById(id);

    if (!response) {
      throw new AppError({
        message: "Error al eliminar el permiso",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    return response;
  }
}
