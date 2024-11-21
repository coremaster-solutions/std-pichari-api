import {
  INotificationRepository,
  IFindAllNotification,
} from "../../domain/repositories";
import {
  ICreateNotificationDto,
  IUpdateNotificationDto,
} from "../../domain/dtos";
import { AppError } from "@/shared/domain/models";
import {
  IDataWithPagination,
  MessageMapTypePrisma,
  TPrismaService,
  messageMapPrisma,
  paginate,
} from "@/shared/infrastructure/db";
import { Prisma } from "@prisma/client";
import { DeleteManyResponse, NotificationModel } from "../../domain/models";

const fieldsSelect: Prisma.NotificationSelect = {
  id: true,
};

export class NotificationPrismaRepository implements INotificationRepository {
  constructor(private db: TPrismaService) {}
  async findManyByProcedureNumber(
    procedureNumber: string
  ): Promise<NotificationModel[] | null> {
    try {
      return await this.db.notification.findMany({
        where: {
          data: {
            path: ["procedureNumber"],
            equals: procedureNumber,
          },
        },
      });
    } catch (error: any) {
      throw new AppError({
        message: error.message,
        errorCode: "Error",
      });
    }
  }

  async deleteManyByProcedureNumber(
    procedureNumber: string
  ): Promise<DeleteManyResponse> {
    try {
      return await this.db.notification.deleteMany({
        where: {
          data: {
            path: ["procedureNumber"],
            equals: procedureNumber,
          },
        },
      });
    } catch (error: any) {
      throw new AppError({
        message: error.message,
        errorCode: "Error",
      });
    }
  }

  async findAll({
    page,
    perPage,
    term,
    dateFrom,
    dateTo,
    personalId,
    officeId,
    readAt,
  }: IFindAllNotification): Promise<IDataWithPagination<NotificationModel[]>> {
    const { data, meta } = await paginate(
      this.db.notification,
      {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          ...(term && {
            OR: [
              {
                data: { equals: { procedureNumber: term } },
              },
            ],
          }),
          ...(readAt &&
            readAt && {
              NOT: [
                {
                  readAt: null,
                },
              ],
            }),
          ...(dateFrom &&
            dateTo && {
              OR: [
                {
                  createdAt: {
                    gte: new Date(dateFrom).toISOString(),
                    lte: new Date(dateTo).toISOString(),
                  },
                },
              ],
            }),
          ...(officeId && {
            AND: [
              {
                officeId,
              },
            ],
          }),
          ...(personalId && {
            AND: [
              {
                personalId,
              },
            ],
          }),
        },
      },
      {
        page: page,
        perPage: perPage,
      }
    );

    return { data: data as NotificationModel[], metadata: meta };
  }

  async create({
    ...data
  }: ICreateNotificationDto): Promise<NotificationModel> {
    try {
      const res = await this.db.notification.create({
        data: { ...data },
      });
      return res;
    } catch (error: any) {
      console.log(error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("La notificación");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async update(
    id: string,
    data: IUpdateNotificationDto
  ): Promise<NotificationModel> {
    try {
      return await this.db.notification.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("La notificación");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findById(id: string): Promise<NotificationModel | null> {
    try {
      return await this.db.notification.findFirst({
        where: { id },
      });
    } catch (error: any) {
      throw new AppError({
        message: error.message,
        errorCode: "Error",
      });
    }
  }
  async deleteById(id: string): Promise<NotificationModel> {
    try {
      return await this.db.notification.delete({ where: { id } });
    } catch (error: any) {
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("La notificación");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
}
