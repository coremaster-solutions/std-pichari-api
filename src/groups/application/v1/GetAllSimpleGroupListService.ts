import { IFindAllSimpleDto } from "../../domain/dtos";
import { IGroupsRepository } from "../../domain/repositories";

interface IRequest extends IFindAllSimpleDto {
  id: string;
}
export class GetAllSimpleGroupListService {
  constructor(private groupsRepository: IGroupsRepository) {}
  async execute(queryData: IRequest): Promise<any> {
    const groups = await this.groupsRepository.findAllSimple(queryData);

    return {
      message: "Successful",
      code: "000000",
      data: groups,
    };
  }
}
