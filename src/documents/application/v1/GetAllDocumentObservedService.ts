import { IPersonalRepository } from "@/personals/domain/repositories";
import { StatusDocumentEnum } from "../../domain/enum";
import { IDocumentRepository } from "../../domain/repositories";
import { AppError } from "@/shared/domain/models";

interface IRequest {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: StatusDocumentEnum;
  destinyPersonalId?: string;
  destinyOfficeId?: string;
}
export class GetAllDocumentObservedService {
  constructor(
    private documentRepository: IDocumentRepository,
    private personalRepository: IPersonalRepository
  ) {}

  async execute({
    destinyPersonalId,
    destinyOfficeId,
    ...queryData
  }: IRequest): Promise<any> {
    const personal = await this.personalRepository.findById(destinyPersonalId!);

    if (!personal) {
      throw new AppError({
        message: `El personal logueado no existe`,
      });
    }

    const response = await this.documentRepository.findAllObserved({
      ...queryData,
      destinyOfficeId:
        destinyOfficeId ??
        personal.personalOffices?.find((office) => office.isMain)?.officeId,
      status: StatusDocumentEnum.OBSERVED,
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
