import { PersonalModel } from "../../domain/models";
import { IPersonalRepository } from "../../domain/repositories/IPersonalRepository";

interface IRequest {
  id: string;
}

export class RemoveOnePersonalService {
  constructor(private personalRepository: IPersonalRepository) {}

  async execute({
    id,
  }: IRequest): Promise<{ data: Omit<PersonalModel, "password"> | null }> {
    const response = await this.personalRepository.deleteById(id);

    return { data: response };
  }
}
