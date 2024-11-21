import {
  IArchivistRepository,
  IFindAllArchivist,
} from "../../domain/repositories";
import { ICreateArchivistDto, IUpdateArchivistDto } from "../../domain/dtos";
import { selectAttributePersonal } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import {
  IDataWithPagination,
  MessageMapTypePrisma,
  TPrismaService,
  messageMapPrisma,
  paginate,
} from "@/shared/infrastructure/db";
import { Prisma } from "@prisma/client";
import { ArchivistModel } from "../../domain/models";

const fieldsSelect: Prisma.ArchivistSelect = {
  id: true,
  name: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  entityId: true,
  entityType: true,
};

export class ArchivistPrismaRepository implements IArchivistRepository {
  constructor(private db: TPrismaService) {}
  async findByEntityIdAndDefault(
    entityId: string
  ): Promise<ArchivistModel | null> {
    try {
      return await this.db.archivist.findFirst({
        where: { entityId, default: true },
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
    entityId,
    entityType,
  }: IFindAllArchivist): Promise<IDataWithPagination<ArchivistModel[]>> {
    const { data, meta } = await paginate(
      this.db.archivist,
      {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          ...(term && {
            OR: [
              {
                year: { contains: Number(term), mode: "insensitive" },
              },
              {
                description: { contains: term, mode: "insensitive" },
              },
            ],
          }),
          ...(entityId && {
            entityId: {
              in: entityId?.split(",") as string[],
            },
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
        },
        select: fieldsSelect,
      },
      {
        page: page,
        perPage: perPage,
      }
    );

    return { data: data as ArchivistModel[], metadata: meta };
  }

  async create(data: ICreateArchivistDto): Promise<ArchivistModel> {
    try {
      const res = await this.db.archivist.create({
        data,
      });
      return res;
    } catch (error: any) {
      console.log(error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El archivero");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async update(id: string, data: IUpdateArchivistDto): Promise<ArchivistModel> {
    try {
      return await this.db.archivist.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El archivero");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findById(id: string): Promise<ArchivistModel | null> {
    try {
      return await this.db.archivist.findFirst({
        where: { id },
      });
    } catch (error: any) {
      throw new AppError({
        message: error.message,
        errorCode: "Error",
      });
    }
  }
  async deleteById(id: string): Promise<ArchivistModel> {
    try {
      return await this.db.archivist.delete({ where: { id } });
    } catch (error: any) {
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El archivero");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
}
