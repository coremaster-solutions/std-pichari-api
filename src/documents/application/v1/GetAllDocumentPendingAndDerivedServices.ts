import { IPersonalRepository } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import { StatusDocumentEnum } from "../../domain/enum";
import { IDocumentRepository } from "../../domain/repositories";

interface IRequest {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  personalId?: string;
  documentTypeId?: string;
  destinyOfficeId?: string;
  destinyPersonalId?: string;
}

export class GetAllDocumentPendingAndDerivedService {
  constructor(
    private documentRepository: IDocumentRepository,
    private personalRepository: IPersonalRepository
  ) {}

  async execute({
    destinyPersonalId,
    destinyOfficeId,
    personalId,
    ...queryData
  }: IRequest): Promise<any> {
    const personal = await this.personalRepository.findById(personalId!);

    if (!personal) {
      throw new AppError({
        message: `El personal logueado no existe`,
      });
    }

    const response = await this.documentRepository.findAllPendingAndDerived({
      ...queryData,
      ...(personal.role !== "ADMIN" && {
        destinyOfficeId:
          destinyOfficeId ??
          personal.personalOffices?.find((office) => office.isMain)?.officeId,
      }),
      status: `${StatusDocumentEnum.PENDING_RECEPTION}` as string,
    });

    const { data, metadata } = response;
    return {
      message: "Successful",
      code: "000000",
      data: {
        data: data.map(({ trackings, ...doc }) => ({
          ...doc,
          tracking: trackings?.at(0),
        })),
        metadata,
      },
    };
  }
}
