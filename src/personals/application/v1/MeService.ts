import { PersonalModel } from "@/personals/domain/models";
import { AppError } from "@/shared/domain/models";
import { IServiceResponse } from "@/shared/infrastructure/http/models";
import { IPersonalRepository } from "../../domain/repositories/IPersonalRepository";
import { OfficeGroupModel } from "@/office_groups/domain/models";

interface IRequest {
  userId: string;
}

export class MeService {
  constructor(private personalRepository: IPersonalRepository) {}

  async execute({ userId }: IRequest): Promise<any> {
    const personal = await this.personalRepository.findById(userId);

    if (!personal) {
      throw new AppError({
        message: "El personal logueado no existe",
      });
    }
    const userWithPermissions = personal as PersonalModel & {
      groupOffices?: OfficeGroupModel[] | null;
    };
    const { groupOffices, ...personalWithoutGroupOffices } =
      userWithPermissions;

    return {
      message: "Successful",
      code: "000000",
      data: {
        ...personalWithoutGroupOffices,
        groups: groupOffices?.map(({ group, ...other }) => ({
          ...other,
          group: {
            id: group?.id,
            description: group?.description,
            permissions: group?.permissions?.flatMap(
              (permission) => permission.permission
            ),
          },
        })),
      },
    } as IServiceResponse<PersonalModel>;
  }
}
