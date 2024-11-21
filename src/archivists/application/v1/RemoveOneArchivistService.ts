import { ArchivistModel } from "../../domain/models";
import { IArchivistRepository } from "../../domain/repositories";

interface IRequest {
  id: string;
}

export class RemoveOneArchivistService {
  constructor(private archivistRepository: IArchivistRepository) {}

  async execute({ id }: IRequest): Promise<ArchivistModel> {
    const response = await this.archivistRepository.deleteById(id);

    return response;
  }
}
