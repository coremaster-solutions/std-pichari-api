import { AppError } from "@/shared/domain/models";
import { IUploadFileProvider } from "@/shared/infrastructure/containers";
import { isEmpty } from "@/shared/utils";
import httpStatus from "http-status";
import { PersonalModel } from "../../domain/models";
import { IPersonalRepository } from "../../domain/repositories/IPersonalRepository";

interface IRequest {
  id: string;
  avatarUrl: string;
}

export class UpdateAvatarPersonalService {
  constructor(
    private personalRepository: IPersonalRepository,
    private uploadLocalProvider: IUploadFileProvider
  ) {}

  async execute({
    id,
    avatarUrl,
  }: IRequest): Promise<{ data: Omit<PersonalModel, "password"> }> {
    const personalExist = await this.personalRepository.findById(id);

    if (!personalExist) {
      throw new AppError({
        message: "El usuario no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }
    let newAvatarUrl = personalExist.avatarUrl;
    if (avatarUrl && avatarUrl !== personalExist.avatarUrl) {
      newAvatarUrl = avatarUrl;
      !isEmpty(personalExist.avatarUrl) &&
        (await this.uploadLocalProvider.removeFileByPath(
          personalExist?.avatarUrl!
        ));
    }

    const response = await this.personalRepository.update(id, {
      avatarUrl: newAvatarUrl,
    });

    return { data: response };
  }
}
