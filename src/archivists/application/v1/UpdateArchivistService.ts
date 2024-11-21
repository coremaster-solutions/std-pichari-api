import { ArchivistModel } from "../../domain/models";
import { IArchivistRepository } from "../../domain/repositories";
import { Prisma } from "@prisma/client";

interface IRequest extends Prisma.ArchivistUpdateInput {
  id: string;
}

export class UpdateArchivistService {
  constructor(private archivistRepository: IArchivistRepository) {}

  async execute({ id, ...data }: IRequest): Promise<ArchivistModel> {
    const response = await this.archivistRepository.update(id, data);

    return response;
  }
}
