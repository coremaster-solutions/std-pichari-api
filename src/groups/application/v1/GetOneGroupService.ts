import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { IGroupsRepository } from "../../domain/repositories";

interface IRequest {
  id: string;
}
export class GetOneGroupService {
  constructor(private groupsRepository: IGroupsRepository) {}
  async execute({ id, ...data }: IRequest): Promise<any> {
    const group = await this.groupsRepository.findById(id);

    if (!group) {
      throw new AppError({
        message: "El grupo no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    return group;
  }
}
