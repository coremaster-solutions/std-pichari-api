import { IOfficeGroupsRepository } from "@/office_groups/domain/repositories";
import { IOfficeRepository } from "@/offices/domain/repositories";
import { IPersonalRepository } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import { IServiceResponse } from "@/shared/infrastructure/http/models";

interface IRequest {
  officeId: string;
  personalId: string;
}

export class GetGroupOneByPersonalAndOfficeService {
  constructor(private officeGroupsRepository: IOfficeGroupsRepository) {}

  async execute({ personalId, officeId }: IRequest): Promise<any> {
    const officeGroup =
      await this.officeGroupsRepository.findOneGroupByOfficeIdAndPersonalId({
        personalId,
        officeId,
      });
    return {
      message: "Successful",
      code: "000000",
      data: officeGroup ?? null,
    } as IServiceResponse<any>;
  }
}
