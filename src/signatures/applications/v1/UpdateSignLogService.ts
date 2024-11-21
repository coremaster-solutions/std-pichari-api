import { AppError } from "@/shared/domain/models";
import { StatusSignLog } from "../../domain/enum";
import { SignLogModel } from "../../domain/models";
import { ISignLogRepository } from "../../domain/repositories";

interface IRequest {
  id: string;
  status?: StatusSignLog;
  documentUrl?: string;
}

export class UpdateSignLogService {
  constructor(private signLogRepository: ISignLogRepository) {}

  async execute({ id, documentUrl, status }: IRequest): Promise<SignLogModel> {
    const signLog = await this.signLogRepository.findById(id);

    if (!signLog) {
      throw new AppError({
        message: "El log del firmado no existe",
      });
    }

    const updateData = await this.signLogRepository.update(id, {
      ...(documentUrl && { documentUrl }),
      ...(status && { status }),
    });

    return updateData;
  }
}
