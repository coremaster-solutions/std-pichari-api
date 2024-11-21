import { FORGET_PASSWORD_PREFIX } from "@/personals/utils";
import { AppError } from "@/shared/domain/models";
import {
  IEncryptProvider,
  IRedisProvider,
} from "@/shared/infrastructure/containers";
import httpStatus from "http-status";
import { PersonalModel } from "../../domain/models";
import { IPersonalRepository } from "../../domain/repositories/IPersonalRepository";

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordPersonalService {
  constructor(
    private personalRepository: IPersonalRepository,
    private encryptProvider: IEncryptProvider,
    private redisProvider: IRedisProvider
  ) {}

  async execute({
    token,
    password,
  }: IRequest): Promise<Omit<PersonalModel, "password">> {
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await this.redisProvider.getData(key);
    console.log("userId redis:::", userId);

    if (!userId) {
      throw new AppError({
        message: "El token ha expirado",
      });
    }

    const personalExist = await this.personalRepository.findById(userId);

    if (!personalExist) {
      throw new AppError({
        message: "El usuario no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const response = await this.personalRepository.update(userId, {
      ...(password && { password: await this.encryptProvider.hash(password) }),
    });

    await this.redisProvider.delete(key);

    return response;
  }
}
