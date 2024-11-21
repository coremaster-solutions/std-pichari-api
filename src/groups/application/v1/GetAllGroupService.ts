import { IFindAllDto } from "../../domain/dtos";
import { IGroupsRepository } from "../../domain/repositories";

interface IRequest extends IFindAllDto {
  id: string;
}
export class GetAllGroupService {
  constructor(private groupsRepository: IGroupsRepository) {}
  async execute(queryData: IRequest): Promise<any> {
    const groups = await this.groupsRepository.findAll(queryData);

    return {
      message: "Successful",
      code: "000000",
      data: groups,
    };
  }
}
