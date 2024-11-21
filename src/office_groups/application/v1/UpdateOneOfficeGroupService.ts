import { IGroupsRepository } from "@/groups/domain/repositories";
import { IOfficeRepository } from "@/offices/domain/repositories";
import { IPersonalRepository } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { IUpdateOfficeGroupDto } from "../../domain/dtos";
import { OfficeGroupModel } from "../../domain/models";
import { IOfficeGroupsRepository } from "../../domain/repositories";

interface IRequest extends IUpdateOfficeGroupDto {}
export class UpdateOneOfficeGroupService {
  constructor(
    private officeGroupsRepository: IOfficeGroupsRepository,
    private groupsRepository: IGroupsRepository,
    private officeRepository: IOfficeRepository,
    private personalRepository: IPersonalRepository
  ) {}
  async execute(
    id: string,
    { officeId, groupId, personalId }: IRequest
  ): Promise<OfficeGroupModel> {
    if (officeId) {
      const officeExists = await this.officeRepository.findById(officeId ?? "");
      if (!officeExists) {
        throw new AppError({
          message: `La oficina no existe`,
          statusCode: httpStatus.NOT_FOUND,
        });
      }
    }

    const groupExists = await this.groupsRepository.findById(groupId ?? "");
    if (!groupExists) {
      throw new AppError({
        message: `El grupo no existe`,
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    if (personalId) {
      const personalExists = await this.personalRepository.findById(
        personalId ?? ""
      );
      if (!personalExists) {
        throw new AppError({
          message: `El personal no existe`,
          statusCode: httpStatus.NOT_FOUND,
        });
      }
    }

    const groupOfficeExists = await this.officeGroupsRepository.findById(
      id ?? ""
    );

    if (!groupOfficeExists) {
      throw new AppError({
        message: `La oficina del grupo asociado al personal no existe, con el id: ${id}`,
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const groupOffice = await this.officeGroupsRepository.updateById(id, {
      officeId,
      groupId,
      personalId,
    });

    return groupOffice ?? ({} as OfficeGroupModel);
  }
}
