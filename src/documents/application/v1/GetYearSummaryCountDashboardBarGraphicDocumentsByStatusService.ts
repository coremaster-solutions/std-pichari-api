import { StatusDocumentEnum } from "@/documents/domain/enum";
import { statusProcedureEs } from "@/documents/locale";
import { IPersonalRepository } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { IDocumentRepository } from "../../domain/repositories";
import { RoleEnum } from "@/personals/domain/enum";

export interface IGetSummaryCountDashboardBarGraphicYearByStatusRequest {
  userId: string;
  year?: string;
  status: StatusDocumentEnum;
  backgroundColor?: string;
}
export class GetYearSummaryCountDashboardBarGraphicDocumentsByStatusService {
  constructor(
    private documentRepository: IDocumentRepository,
    private personalRepository: IPersonalRepository
  ) {}

  async execute({
    userId,
    year = new Date().getFullYear().toString(),
    status,
    backgroundColor = "#ADCA90",
  }: IGetSummaryCountDashboardBarGraphicYearByStatusRequest): Promise<any> {
    const personal = await this.personalRepository.findById(userId);
    if (!personal) {
      throw new AppError({
        message: "El usuario no esta logueado",
        statusCode: httpStatus.UNAUTHORIZED,
      });
    }

    const response = await Promise.all(
      Array.from({ length: 12 }).map(
        async (_, index) =>
          await this.documentRepository.countDocumentsMonthByDestinyOfficeAndStatus(
            {
              ...(personal.role !== RoleEnum.ADMIN && {
                destinyOfficeId:
                  personal.personalOffices?.find((office) => office.isMain)
                    ?.officeId ?? undefined,
              }),
              status,
              startOfMonth: new Date(Number(year), index, 1).toISOString(),
              endOfMonth: new Date(Number(year), index + 1, 0).toISOString(),
            }
          )
      )
    );

    return {
      labels: Array.from({ length: 12 }, (_, index) =>
        new Date(Number(year), index + 1, 0).toLocaleDateString("es-PE", {
          month: "long",
        })
      ),
      datasets: [
        {
          label: statusProcedureEs[status],
          data: response,
          backgroundColor,
        },
      ],
    };
  }
}
