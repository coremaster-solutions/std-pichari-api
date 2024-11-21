import { ArchivistModel } from "../../domain/models";
import { IArchivistRepository } from "../../domain/repositories";
import { Prisma } from "@prisma/client";

interface IRequest extends Prisma.ArchivistCreateInput {}

export class CreateArchivistService {
  constructor(private archivistRepository: IArchivistRepository) {}

  async execute(data: IRequest): Promise<ArchivistModel> {
    if (data.default) {
      const archivistDefault =
        await this.archivistRepository.findByEntityIdAndDefault(
          data.entityId ?? ""
        );
      if (archivistDefault) {
        await this.archivistRepository.update(archivistDefault.id, {
          default: false,
        });
      }
    }
    const response = await this.archivistRepository.create(data);

    return response;
  }
}
