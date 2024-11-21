import { IArchivistRepository } from "@/archivists/domain/repositories";
import { AppError } from "@/shared/domain/models";
import { ArchivistType } from "@prisma/client";
import { ICreateOfficeDto } from "../../domain/dtos";
import { IOfficeRepository } from "../../domain/repositories";

export class CreateOfficeService {
  constructor(
    private officeRepository: IOfficeRepository,
    private archivistRepository: IArchivistRepository
  ) {}

  async execute(data: ICreateOfficeDto): Promise<any> {
    const officeExists = await this.officeRepository.findByName(data.name);

    if (officeExists) {
      throw new AppError({
        message: `La oficina con el nombre (${data.name}) ya existe`,
      });
    }

    const office = await this.officeRepository.create(data);

    const archivist = await this.archivistRepository.create({
      name: "Archivero 1",
      description: "Primer archivero de la oficina",
      entityId: office.id,
      entityType: ArchivistType.OFFICE,
      default: true,
    });
    return { ...office, archivist: archivist };
  }
}
