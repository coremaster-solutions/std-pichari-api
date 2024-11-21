import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { IPermissionsRepository } from "../../domain/repositories";

interface IRequest {
  id: string;
}
export class GetOnePermissionService {
  constructor(private permissionsRepository: IPermissionsRepository) {}
  async execute({ id }: IRequest): Promise<any> {
    const permission = await this.permissionsRepository.findById(id);

    if (!permission) {
      throw new AppError({
        message: "El permiso no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    return permission;
  }
}
