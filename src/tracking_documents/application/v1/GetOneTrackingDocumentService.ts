import { AppError } from "@/shared/domain/models";
import { TrackingDocumentModel } from "../../domain/models";
import { ITrackingDocumentRepository } from "../../domain/repositories";
import httpStatus from "http-status";

interface IRequest {
  id: string;
}

export class GetOneTrackingDocumentService {
  constructor(
    private trackingDocumentRepository: ITrackingDocumentRepository
  ) {}

  async execute({ id }: IRequest): Promise<TrackingDocumentModel> {
    const response = await this.trackingDocumentRepository.findById(id);

    if (!response) {
      throw new AppError({
        message: "El seguimiento del documento no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    return response;
  }
}
