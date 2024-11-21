import { IPersonalRepository } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import { IServiceResponse } from "@/shared/infrastructure/http/models";

interface IRequest {
  userId: string;
}

export class GetAllOfficesByUserService {
  constructor(private personalRepository: IPersonalRepository) {}

  async execute({ userId }: IRequest): Promise<any> {
    const personal = await this.personalRepository.findById(userId);

    if (!personal) {
      throw new AppError({
        message: "El personal no existe",
      });
    }

    return {
      message: "Successful",
      code: "000000",
      data: personal.personalOffices,
    } as IServiceResponse<any>;
  }
}
