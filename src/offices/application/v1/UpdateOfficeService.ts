import { AppError } from "@/shared/domain/models";
import { IUpdateOfficeDto } from "../../domain/dtos";
import { OfficeModel } from "../../domain/models";
import { IOfficeRepository } from "../../domain/repositories";

interface IRequest extends IUpdateOfficeDto {
  id: string;
}

export class UpdateOfficeService {
  constructor(private officeRepository: IOfficeRepository) {}

  async execute({ id, ...data }: IRequest): Promise<OfficeModel | null> {
    const officeExists = await this.officeRepository.findByName(
      data?.name as string
    );

    if (officeExists?.id !== id && officeExists?.name === data.name) {
      throw new AppError({
        message: `La oficina con ese nombre (${data.name}) ya existe`,
      });
    }

    const office = await this.officeRepository.update(id, data);

    return office;
  }
}
