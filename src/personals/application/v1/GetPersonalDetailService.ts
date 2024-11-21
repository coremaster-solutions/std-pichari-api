import { IServiceResponse } from "@/shared/infrastructure/http/models";
import { PersonalModel } from "../../domain/models";
import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { IPersonalRepository } from "../../../personals/domain/repositories/IPersonalRepository";

interface IRequest {
  id: string;
}

export class GetPersonalDetailService {
  constructor(private personalRepository: IPersonalRepository) {}

  async execute({
    id,
  }: IRequest): Promise<
    IServiceResponse<Omit<PersonalModel, "password"> | null>
  > {
    const response = await this.personalRepository.findById(id);

    let newResponse = new Map();
    if (!response) {
      throw new AppError({
        message: "El usuario no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }
    if (response) {
      newResponse = new Map(Object.entries(response));
      newResponse.delete("password");
    }

    return {
      message: "Successful",
      code: "000000",
      data: Object.fromEntries(newResponse),
    } as IServiceResponse<Omit<PersonalModel, "password"> | null>;
  }
}
