import { OfficeGroupModel } from "@/office_groups/domain/models";
import { IOfficeGroupsRepository } from "@/office_groups/domain/repositories";
import { PersonalModel } from "@/personals/domain/models";
import { IPersonalRepository } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import { IServiceResponse } from "@/shared/infrastructure/http/models";

interface IRequest {
  previousPersonalId: string;
}

export class GetOnePersonalOfficeDelegateByPreviousPersonalIdService {
  constructor(
    private officeGroupsRepository: IOfficeGroupsRepository,
    private personalRepository: IPersonalRepository
  ) {}

  async execute({ previousPersonalId }: IRequest): Promise<any> {
    // const officeGroupDelegate =
    //   await this.officeGroupsRepository.findByPreviousPersonalId(
    //     previousPersonalId
    //   );

    // if (!officeGroupDelegate) {
    //   return {
    //     message: "Successful",
    //     code: "000000",
    //     data: null,
    //   } as IServiceResponse<any>;
    // }
    // const personal = await this.personalRepository.findById(
    //   officeGroupDelegate?.personalId ?? ""
    // );

    // if (!personal) {
    //   throw new AppError({
    //     message: "El personal no existe",
    //   });
    // }
    // const personalWithGroups = personal as PersonalModel & {
    //   groupOffices?: OfficeGroupModel[] | null;
    // };
    // const group = personalWithGroups?.groupOffices?.find(
    //   (g) => g.previousPersonalId === officeGroupDelegate?.previousPersonalId
    // );

    // const lastOffice = personal.personalOffices?.pop();

    return {
      message: "Successful",
      code: "000000",
      data: {
        // personalOffice:
        //   lastOffice?.officeId === group?.officeId &&
        //   lastOffice?.personalId === group?.personalId
        //     ? lastOffice
        //     : null,
        // group,
      },
    } as IServiceResponse<any>;
  }
}
