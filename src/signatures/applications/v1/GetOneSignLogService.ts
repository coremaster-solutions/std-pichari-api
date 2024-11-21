import { AppError } from "@/shared/domain/models";
import { SignLogModel } from "../../domain/models";
import { ISignLogRepository } from "../../domain/repositories";

interface IRequest {
  id: string;
}

export class GetOneSignLogService {
  constructor(private signLogRepository: ISignLogRepository) {}

  async execute({ id }: IRequest): Promise<SignLogModel> {
    const signLog = await this.signLogRepository.findById(id);

    if (!signLog) {
      throw new AppError({
        message: "El log del firmado no existe",
      });
    }

    return signLog;
  }
}
