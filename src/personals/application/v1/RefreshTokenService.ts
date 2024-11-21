import { PersonalModel } from "@/personals/domain/models";
import { AppError } from "@/shared/domain/models";
import { IJwtProvider } from "@/shared/infrastructure/containers";
import { IPersonalRepository } from "../../domain/repositories/IPersonalRepository";
import httpStatus from "http-status";

interface IRequest {
  refresh_token: string;
}

type TokenResponse = {
  refresh_token: string;
  token: string;
};
type DataResponse = {
  data: TokenResponse;
};

export class RefreshTokenService {
  constructor(
    private personalRepository: IPersonalRepository,
    private jwtProvider: IJwtProvider
  ) {}

  async execute({ refresh_token }: IRequest): Promise<DataResponse | AppError> {
    const response = await this.jwtProvider.verify<PersonalModel>(
      refresh_token
    );

    if (typeof response === "undefined") {
      throw new AppError({
        message: "token_refresh.expired",
        statusCode: httpStatus.UNAUTHORIZED,
      });
    }
    const personal = await this.personalRepository.findById(response.id);

    if (!personal) {
      throw new AppError({
        message: "Personal logueado no existe",
        statusCode: httpStatus.UNAUTHORIZED,
      });
    }

    const token = await this.jwtProvider.sign(personal, "6h");
    const new_refresh_token = await this.jwtProvider.sign(personal, "8h");

    return {
      data: {
        token,
        refresh_token: new_refresh_token,
      },
    } as DataResponse;
  }
}
