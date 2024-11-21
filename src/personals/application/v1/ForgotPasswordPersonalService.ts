import { AppError } from "@/shared/domain/models";
import {
  IJobsProvider,
  IRedisProvider,
} from "@/shared/infrastructure/containers";
import httpStatus from "http-status";
import { IPersonalRepository } from "../../domain/repositories/IPersonalRepository";
import { PersonalModel } from "@/personals/domain/models";
import { v4 } from "uuid";
import { FORGET_PASSWORD_PREFIX } from "@/personals/utils";

interface IRequest {
  username: string;
}

export class ForgotPasswordPersonalService {
  constructor(
    private personalRepository: IPersonalRepository,
    private jobsProvider: IJobsProvider,
    private redisProvider: IRedisProvider
  ) {}

  async execute({ username }: IRequest): Promise<any> {
    const personalExist = await this.personalRepository.findByUsername(
      username
    );

    if (!personalExist) {
      throw new AppError({
        message: "El usuario no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }
    const token = v4();
    const key = FORGET_PASSWORD_PREFIX + token;
    await this.redisProvider.setData({
      key,
      value: personalExist.id,
      seconds: 1000 * 60 * 60 * 24 * 3, // 3 days
    });

    this.jobsProvider.add<{ personal: PersonalModel; token: string }>({
      type: "forgot_password",
      data: {
        personal: personalExist,
        token,
      },
    });

    return {
      email: true,
      message:
        "Te hemos enviar un mensaje a tu correo, sigue las instrucciones para cambiar tu contraseña",
    };
  }
}
