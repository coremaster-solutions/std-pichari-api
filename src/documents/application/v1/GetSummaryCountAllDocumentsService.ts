import { IPersonalRepository } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { IDocumentRepository } from "../../domain/repositories";
import { RoleEnum } from "@/personals/domain/enum";

interface IRequest {
  userId: string;
  destinyOfficeId?: string;
}
export class GetSummaryCountAllDocumentsService {
  constructor(
    private documentRepository: IDocumentRepository,
    private personalRepository: IPersonalRepository
  ) {}

  async execute({ userId, destinyOfficeId }: IRequest): Promise<any> {
    const personal = await this.personalRepository.findById(userId);
    if (!personal) {
      throw new AppError({
        message: "El usuario no esta logueado",
        statusCode: httpStatus.UNAUTHORIZED,
      });
    }

    console.log({
      ...(personal.role !== RoleEnum.ADMIN && {
        destinyOfficeId:
          destinyOfficeId ??
          personal.personalOffices?.find((office) => office.isMain)?.officeId,
      }),
    });

    const summaryDb =
      await this.documentRepository.countDocumentsCurrentMonthByDestinyOffice({
        ...(personal.role !== RoleEnum.ADMIN && {
          destinyOfficeId:
            destinyOfficeId ??
            personal.personalOffices?.find((office) => office.isMain)?.officeId,
        }),
      });

    return summaryDb;
  }
}
