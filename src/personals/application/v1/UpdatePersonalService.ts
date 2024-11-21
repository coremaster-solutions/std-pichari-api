import { RoleEnum, RoleType } from "@/personals/domain/enum";
import { IPersonalOfficesRepository } from "@/personals_offices/domain/repositories";
import { Envs } from "@/shared/config";
import { AppError } from "@/shared/domain/models";
import {
  IEncryptProvider,
  IUploadFileProvider,
} from "@/shared/infrastructure/containers";
import { isEmpty } from "@/shared/utils";
import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { PersonalModel } from "../../domain/models";
import { IPersonalRepository } from "../../domain/repositories/IPersonalRepository";
type PersonalOfficeInput = {
  id: string;
  officeId: string;
  position: string;
};
interface IRequest extends Prisma.PersonalUpdateInput {
  id: string;
  password?: string;
  officeId?: string;
  position?: string;
  additionalOffices?: PersonalOfficeInput[];
}

export class UpdatePersonalService {
  constructor(
    private personalRepository: IPersonalRepository,
    private encryptProvider: IEncryptProvider,
    private uploadLocalProvider: IUploadFileProvider,
    private personalOfficesRepository: IPersonalOfficesRepository
  ) {}

  async execute({
    id,
    password,
    avatarUrl,
    officeId,
    position,
    additionalOffices,
    ...data
  }: IRequest): Promise<{ data: Omit<PersonalModel, "password"> }> {
    try {
      const personalExist = await this.personalRepository.findById(id);

      if (!personalExist) {
        throw new AppError({
          message: "El usuario no existe",
          statusCode: httpStatus.NOT_FOUND,
        });
      }

      if (
        personalExist.role === RoleEnum.ADMIN &&
        personalExist.firstLoginAt !== null
      ) {
        throw new AppError({
          message: `El usuario con el rol (${personalExist.role}) no puede ser modificado`,
        });
      }

      let newAvatarUrl = personalExist.avatarUrl;
      if (avatarUrl && avatarUrl !== personalExist.avatarUrl) {
        const destinationDir = "uploads/avatar";
        newAvatarUrl =
          avatarUrl &&
          (await this.uploadLocalProvider
            .moveFileToPath(avatarUrl as string, destinationDir)
            .catch((error) => {
              console.log("ERROR", error);

              throw new AppError({ message: error.toString() });
            }));
        !isEmpty(personalExist.avatarUrl) &&
          (await this.uploadLocalProvider.removeFileByPath(
            personalExist?.avatarUrl!
          ));
      }

      const officeMain = await personalExist.personalOffices?.find(
        (office) => office.isMain
      );

      const response = await this.personalRepository.update(id, {
        ...data,
        ...(password && {
          password: await this.encryptProvider.hash(password),
        }),
        avatarUrl: newAvatarUrl,
      });

      if (position && officeId) {
        const updateOfficeMain = await this.personalOfficesRepository.findById(
          officeMain?.id!
        );
        if (!updateOfficeMain) {
          await this.personalOfficesRepository.create({
            officeId,
            personalId: personalExist.id,
            isMain: true,
            position,
          });
        } else {
          await this.personalOfficesRepository.updatePersonalOfficeById(
            officeMain?.id!,
            {
              officeId,
              position: position.trim(),
            }
          );
        }
      }

      if (additionalOffices && additionalOffices.length > 0) {
        await Promise.all(
          additionalOffices.map(
            async (pOffice) =>
              await this.personalOfficesRepository.updatePersonalOfficeById(
                pOffice.id,
                {
                  officeId: pOffice.officeId,
                  position: pOffice.position,
                }
              )
          )
        );
      }

      return { data: response };
    } catch (error: any) {
      console.log("error", error);
      throw new AppError({
        message: error.message,
      });
    }
  }
}
