import { ArchivistModel } from "../../domain/models";
import { IArchivistRepository } from "../../domain/repositories";
import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";

interface IRequest {
  id: string;
}

export class GetOneArchivistService {
  constructor(private archivistRepository: IArchivistRepository) {}

  async execute({ id }: IRequest): Promise<ArchivistModel> {
    const response = await this.archivistRepository.findById(id);

    if (!response) {
      throw new AppError({
        message: "El archivero no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    return response;
  }
}
