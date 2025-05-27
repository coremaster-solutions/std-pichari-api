import { StatusPersonalEnum } from "@/personals/domain/enum";
import { PersonalModel } from "@/personals/domain/models";
import { AppError } from "@/shared/domain/models";
import {
  IEncryptProvider,
  IJwtProvider,
} from "@/shared/infrastructure/containers";
import { IServiceResponse } from "@/shared/infrastructure/http/models";
import { IPersonalRepository } from "@/personals/domain/repositories";

const messageInvalidCredentials = "Credenciales inválidas";

interface IRequest {
  username: string;
  password: string;
}

type TokenResponse = {
  token: string;
  refresh_token: string;
};
type DataResponse = {
  tokens: TokenResponse;
  data: Omit<PersonalModel, "password">;
};

export class LoginPersonalService {
  constructor(
    private personalRepository: IPersonalRepository,
    private encryptService: IEncryptProvider,
    private jwtProvider: IJwtProvider
  ) {}

  async execute({
    username,
    password: passwordInput,
  }: IRequest): Promise<IServiceResponse<DataResponse>> {
    console.log("LoginPersonalService BODY::: ", username, passwordInput);
    const personal = await this.personalRepository.findByUsername(username);

    console.log("LoginPersonalService personal::: ", personal);

    if (!personal) {
      throw new AppError({
        message: messageInvalidCredentials,
      });
    }
    if (personal.status === StatusPersonalEnum.INACTIVE) {
      throw new AppError({
        message:
          "El usuario esta inhabilitado, por favor contacte al administrador",
      });
    }

    const passwordValid = await this.encryptService.verify(
      passwordInput,
      personal.password
    );

    console.log("LoginPersonalService passwordValid::: ", passwordValid);

    if (!passwordValid) {
      throw new AppError({
        message: messageInvalidCredentials,
      });
    }

    const { password, ...personalWithoutPassword } = personal;

    const dataPersonal = personalWithoutPassword;

    const token = await this.jwtProvider.sign(dataPersonal, "4h");
    const refresh_token = await this.jwtProvider.sign(dataPersonal, "6h");
    console.log("LoginPersonalService Successful::: ", token);
    return {
      message: "Successful",
      code: "000000",
      data: {
        tokens: {
          token,
          refresh_token,
        },
        data: dataPersonal,
      },
    } as IServiceResponse<DataResponse>;
  }
}
