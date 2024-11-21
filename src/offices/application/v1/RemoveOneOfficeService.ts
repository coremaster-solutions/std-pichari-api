import { OfficeModel } from "../../domain/models";
import { IOfficeRepository } from "../../domain/repositories";

interface IRequest {
  id: string;
}

export class RemoveOneOfficeService {
  constructor(private officeRepository: IOfficeRepository) {}

  async execute({ id }: IRequest): Promise<OfficeModel> {
    const response = await this.officeRepository.deleteById(id);

    return response;
  }
}
