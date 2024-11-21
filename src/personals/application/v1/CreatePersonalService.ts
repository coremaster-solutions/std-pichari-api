import {
  IEncryptProvider,
  IUploadFileProvider,
} from "@/shared/infrastructure/containers";
import { Prisma } from "@prisma/client";
import { PersonalModel } from "../../domain/models";
import { IPersonalRepository } from "../../domain/repositories/IPersonalRepository";
import { AppError } from "@/shared/domain/models";
import { IPersonalOfficesRepository } from "@/personals_offices/domain/repositories";
import { RoleEnum, RoleType } from "@/personals/domain/enum";
import { Envs } from "@/shared/config";

interface IRequest extends Prisma.PersonalCreateInput {
  officeId: string;
  position: string;
}

export class CreatePersonalService {
  constructor(
    private personalRepository: IPersonalRepository,
    private encryptProvider: IEncryptProvider,
    private uploadFileProvider: IUploadFileProvider,
    private personalOfficesRepository: IPersonalOfficesRepository
  ) {}

  async execute({
    password,
    avatarUrl,
    officeId,
    position,
    ...data
  }: IRequest): Promise<Omit<PersonalModel, "password">> {
    const destinationDir = "uploads/avatar";
    let newAvatarUrl = avatarUrl
      ? await this.uploadFileProvider
          .moveFileToPath(avatarUrl!, destinationDir)
          .catch((error) => {
            console.log("ERROR", error);

            throw new AppError({ message: error.toString() });
          })
      : "";

    if (typeof avatarUrl !== "undefined" && avatarUrl && !newAvatarUrl) {
      throw new AppError({ message: "Error to moved file" });
    }

    const passwordHashed = await this.encryptProvider.hash(password as string);

    const response = await this.personalRepository.create({
      ...data,
      password: passwordHashed,
      avatarUrl: newAvatarUrl,
    });

    await this.personalOfficesRepository.create({
      officeId,
      personalId: response.id,
      isMain: true,
      position,
    });

    return response;
  }
}
