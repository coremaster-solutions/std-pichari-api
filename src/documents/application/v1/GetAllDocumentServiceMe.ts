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
  creatorId?: string;
}
export class GetAllDocumentServiceMe {
  constructor(
    private documentRepository: IDocumentRepository,
    private personalRepository: IPersonalRepository
  ) {}

  async execute({ creatorId, ...queryData }: IRequest): Promise<any> {
    const personal = await this.personalRepository.findById(creatorId!);

    if (!personal) {
      throw new AppError({
        message: `El personal logueado no existe`,
      });
    }

    const response = await this.documentRepository.findAll({
      ...queryData,
      creatorId,
    });
    const { data, metadata } = response;
    return {
      message: "Successful",
      code: "000000",
      data: {
        data: data?.map(({ trackings, ...doc }) => ({
          ...doc,
          tracking: trackings?.at(0),
        })),
        metadata,
      },
    };
  }
}
