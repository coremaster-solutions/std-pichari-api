import { IPersonalRepository } from "@/personals/domain/repositories";
import { StatusDocumentEnum } from "../../domain/enum";
import { IDocumentRepository } from "../../domain/repositories";
import { AppError } from "@/shared/domain/models";
import { prismaService } from "@/shared/infrastructure/db";

interface IRequest {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: StatusDocumentEnum;
  personalId?: string;
  destinyOfficeId?: string;
  destinyPersonalId?: string;
  documentTypeId?: string;
  citizenDocumentNumber?: string;
  trackingNumberCorrelative?: string;
}
export class GetAllCitizenProceduresService {
  constructor(private documentRepository: IDocumentRepository) {}

  async execute({
    citizenDocumentNumber,
    trackingNumberCorrelative,
  }: IRequest): Promise<any> {
    const response =
      await this.documentRepository.findAllByDocumentNumberAndCorrelative({
        citizenDocumentNumber,
        trackingNumberCorrelative,
      });

    return {
      message: "Successful",
      code: "000000",
      data: {
        data:
          response?.map(({ trackings, ...doc }) => ({
            ...doc,
            tracking: trackings?.at(0),
          })) ?? [],
      },
    };
  }
}
