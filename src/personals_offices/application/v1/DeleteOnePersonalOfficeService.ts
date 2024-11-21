import { IPersonalOfficesRepository } from "@/personals_offices/domain/repositories";
import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";

interface IRequest {
  id: string;
}
export class DeleteOnePersonalOfficeService {
  constructor(private personalOfficesRepository: IPersonalOfficesRepository) {}
  async execute({ id }: IRequest): Promise<any> {
    const response = await this.personalOfficesRepository.deleteById(id);

    if (!response) {
      throw new AppError({
        message: "La oficina del personal no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    return response;
  }
}
