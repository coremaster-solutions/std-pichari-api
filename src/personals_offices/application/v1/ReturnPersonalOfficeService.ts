import { OfficeGroupModel } from "@/office_groups/domain/models";
import { IOfficeGroupsRepository } from "@/office_groups/domain/repositories";
import { PersonalModel } from "@/personals/domain/models";
import { IPersonalRepository } from "@/personals/domain/repositories";
import { IPersonalOfficesRepository } from "@/personals_offices/domain/repositories";
import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
interface PreviousDataPersonal {
  groupId: string;
  position: string;
  personalId: string;
}

interface IRequest {
  id: string;
}
export class ReturnPersonalOfficeService {
  constructor(
    private personalOfficesRepository: IPersonalOfficesRepository,
    private officeGroupsRepository: IOfficeGroupsRepository,
    private personalRepository: IPersonalRepository
  ) {}
  async execute({ id }: IRequest): Promise<any> {
    const personal = (await this.personalRepository.findById(
      id
    )) as PersonalModel & {
      groupOffices?: OfficeGroupModel[] | null;
    };

    if (!personal) {
      throw new AppError({
        message: `El personal actual no existe, con el id: ${id}`,
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const groupOfficeDelegated =
      (await this.officeGroupsRepository.findOnePersonalIdToReturn(
        personal?.id
      )) as OfficeGroupModel & {
        previousDataPersonal?: PreviousDataPersonal | null;
      };

    if (!groupOfficeDelegated) {
      throw new AppError({
        message: `El personal no tiene una oficina a retornar`,
      });
    }
    const personalIdToReturn = groupOfficeDelegated.personalId ?? "";

    const personalToReturn = (await this.personalRepository.findById(
      personalIdToReturn
    )) as PersonalModel & {
      groupOffices?: OfficeGroupModel[] | null;
    };

    if (!personalToReturn) {
      throw new AppError({
        message: `El personal con tu oficina delegada no existe, con el id: ${personalIdToReturn}`,
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const personalOfficeMain = personal.personalOffices?.find(
      (office) => office.isMain
    );
    const personalOfficeDelegated = personalToReturn.personalOffices?.find(
      (office) =>
        office.officeId === groupOfficeDelegated?.officeId &&
        office.personalId === groupOfficeDelegated?.personalId
    );

    if (
      personalOfficeMain &&
      personalOfficeDelegated &&
      personalOfficeMain.officeId === personalOfficeDelegated?.officeId &&
      Object.keys(groupOfficeDelegated?.previousDataPersonal ?? {}).length > 0
    ) {
      await this.personalOfficesRepository.update(personalOfficeDelegated?.id, {
        position: groupOfficeDelegated?.previousDataPersonal?.position ?? "",
      });
      await this.officeGroupsRepository.updateById(
        groupOfficeDelegated?.id ?? "",
        {
          groupId: groupOfficeDelegated?.previousDataPersonal?.groupId ?? "",
          previousDataPersonal: {},
          personalIdToReturn: null,
        }
      );
    } else {
      await this.personalOfficesRepository.deleteById(
        personalOfficeDelegated?.id ?? ""
      );
      await this.officeGroupsRepository.deleteById(
        groupOfficeDelegated?.id ?? ""
      );
    }

    return {
      message: "Successful",
      code: "000000",
      data: {
        operationMessage: "La delegación de la oficina ha sido devuelta",
      },
    };
  }
}
