import { OfficeModel } from "../../domain/models";
import { IOfficeRepository } from "../../domain/repositories";
import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";

interface IRequest {
  id: string;
}

export class GetOneOfficeService {
  constructor(private officeRepository: IOfficeRepository) {}

  async execute({ id }: IRequest): Promise<OfficeModel> {
    const response = await this.officeRepository.findById(id);

    if (!response) {
      throw new AppError({
        message: "La oficina no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    return response;
  }
}
