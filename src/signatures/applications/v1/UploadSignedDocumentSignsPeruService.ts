import { AppError } from "@/shared/domain/models";
import { EnumStatusSignLog } from "../../domain/enum";
import { SignLogModel } from "../../domain/models";
import { ISignLogRepository } from "../../domain/repositories";

interface IRequest {
  id: string;
  documentUrl: string;
}

export class UploadSignedDocumentSignsPeruService {
  constructor(private signLogRepository: ISignLogRepository) {}

  async execute({ id, documentUrl }: IRequest): Promise<SignLogModel> {
    const signLog = await this.signLogRepository.findById(id);

    if (!signLog) {
      throw new AppError({
        message: "El log del firmado no existe",
      });
    }

    const updateData = await this.signLogRepository.update(id, {
      documentUrl,
      status: EnumStatusSignLog.SIGNED,
    });

    return updateData;
  }
}
