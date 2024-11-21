import { IDocumentRepository } from "@/documents/domain/repositories";
import { AppError } from "@/shared/domain/models";
import { IGenerateRandomNumberProvider } from "@/shared/infrastructure/containers";
import { ITrackingDocumentRepository } from "@/tracking_documents/domain/repositories";
import httpStatus from "http-status";

interface IRequest {
  id?: string;
}

export class GetLastCorrelativeNumberDocumentService {
  constructor(
    private documentRepository: IDocumentRepository,
    private trackingDocumentRepository: ITrackingDocumentRepository,
    private generateNumberProvider: IGenerateRandomNumberProvider
  ) {}

  async execute({ id }: IRequest): Promise<any> {
    const procedure = await this.documentRepository.findById(id ?? "");

    if (!procedure) {
      throw new AppError({
        message: "El documento no existe",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const trackings = await this.trackingDocumentRepository.findAll({
      documentId: id,
      perPage: 200,
    });
    console.log(
      trackings.data
        ?.map((tracking) => Number(tracking.procedureNumber?.split(".").at(1)))
        .sort((a, b) => b - a)[0]
    );
    const correlative = trackings.data
      ?.map((tracking) => Number(tracking.procedureNumber?.split(".").at(1)))
      .sort((a, b) => b - a)[0];

    const trackingsSize = trackings.data.length;
    let procedureNumber = procedure.procedureNumber;

    if (trackingsSize > 0) {
      procedureNumber =
        procedure.procedureNumber.split(".")[0] +
        "." +
        this.generateNumberProvider.generateProcedureNumberCorrelative(
          correlative
        );
    } else {
      procedureNumber =
        procedure.procedureNumber.split(".")[0] +
        "." +
        this.generateNumberProvider.generateProcedureNumberCorrelative(1);
    }

    return { correlativeNumber: procedureNumber };
  }
}
