import { RoleType } from "@/personals/domain/enum";
import { IPersonalRepository } from "../../domain/repositories/IPersonalRepository";
import { IOfficeGroupsRepository } from "@/office_groups/domain/repositories";
import { OfficeGroupModel } from "@/office_groups/domain/models";

interface IRequest {
  page?: number;
  perPage?: number;
  term?: string;
  role?: string;
  dateFrom?: string;
  dateTo?: string;
}
export class GetAllPersonalService {
  constructor(
    private personalRepository: IPersonalRepository,
    private officeGroupsRepository: IOfficeGroupsRepository
  ) {}

  async execute(queryData: IRequest): Promise<any> {
    const { data, metadata } = await this.personalRepository.findAll(queryData);
    let dataResponse = [];
    for (const personal of data) {
      const groupOfficeDelegated =
        await this.officeGroupsRepository.findOnePersonalIdToReturn(
          personal?.id
        );
      dataResponse.push({
        ...personal,
        isOfficeDelegated: Boolean(groupOfficeDelegated),
      });
    }

    return {
      message: "Successful",
      code: "000000",
      data: {
        data: dataResponse,
        metadata,
      },
    };
  }
}
