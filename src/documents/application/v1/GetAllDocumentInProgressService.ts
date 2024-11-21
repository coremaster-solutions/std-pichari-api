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
  destinyPersonalId?: string;
  destinyOfficeId?: string;
  documentTypeId?: string;
}
export class GetAllDocumentInProgressService {
  constructor(
    private documentRepository: IDocumentRepository,
    private personalRepository: IPersonalRepository
  ) {}

  async execute({ destinyPersonalId, ...queryData }: IRequest): Promise<any> {
    const personal = await this.personalRepository.findById(destinyPersonalId!);

    if (!personal) {
      throw new AppError({
        message: `El personal logueado no existe`,
      });
    }

    const response = await this.documentRepository.findAllInProgress({
      ...queryData,
      destinyOfficeId:
        queryData?.destinyOfficeId! ??
        personal.personalOffices?.find((office) => office.isMain)?.officeId,
      status: StatusDocumentEnum.IN_PROGRESS,
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
