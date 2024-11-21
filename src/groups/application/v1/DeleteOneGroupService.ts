import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { IGroupsRepository } from "../../domain/repositories";

interface IRequest {
  id: string;
}
export class DeleteOneGroupService {
  constructor(private groupsRepository: IGroupsRepository) {}
  async execute({ id }: IRequest): Promise<any> {
    const group = await this.groupsRepository.findById(id);

    if (!group) {
      throw new AppError({
        message: "El grupo no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }
    const response = await this.groupsRepository.deleteById(id);

    if (!response) {
      throw new AppError({
        message: "Error al eliminar el grupo",
        statusCode: httpStatus.NOT_FOUND,
      });
    }
    console.log("DeleteOneGroupService::response::", response);

    return response;
  }
}
