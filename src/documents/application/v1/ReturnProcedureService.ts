import { AppError } from "@/shared/domain/models";
import { TrackingDocumentModel } from "@/tracking_documents/domain/models";
import { ITrackingDocumentRepository } from "@/tracking_documents/domain/repositories";
import httpStatus from "http-status";

export interface IReturnProcedureRequest {
  trackingId: string;
  message: string;
}

export class ReturnProcedureService {
  constructor(
    private trackingDocumentRepository: ITrackingDocumentRepository
  ) {}

  async execute({
    trackingId,
    message,
  }: IReturnProcedureRequest): Promise<TrackingDocumentModel> {
    const currentTrackingProcedure =
      await this.trackingDocumentRepository.findById(trackingId);

    if (!currentTrackingProcedure) {
      throw new AppError({
        message: "El seguimiento del documento no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }
    const derivedDataPrevious = currentTrackingProcedure.derivedData as {
      originOfficeId: string;
      originPersonalId: string;
      destinyOfficeId: string;
      destinyPersonalId: string;
    };

    const tracking = await this.trackingDocumentRepository.update(trackingId, {
      originOfficeId: derivedDataPrevious.originOfficeId,
      originPersonalId: derivedDataPrevious.originPersonalId,
      destinyOfficeId: derivedDataPrevious.destinyOfficeId,
      destinyPersonalId: derivedDataPrevious.destinyPersonalId,
      derivedData: {},
      message,
    });

    return tracking;
  }
}
