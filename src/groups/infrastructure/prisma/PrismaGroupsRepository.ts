import { selectAttributePersonal } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import {
  IDataWithPagination,
  messageMapPrisma,
  MessageMapTypePrisma,
  paginate,
  TPrismaService,
} from "@/shared/infrastructure/db";
import {
  ICreateGroupDto,
  IFindAllDto,
  IFindAllSimpleDto,
  IUpdateGroupDto,
} from "../../domain/dtos";
import { GroupModel, selectGroup } from "../../domain/models";
import { IGroupsRepository } from "../../domain/repositories";
import { selectPermission } from "@/permissions/domain/models";
import { selectGroupPermission } from "@/group_permissions/domain/models";

export class PrismaGroupsRepository implements IGroupsRepository {
  constructor(private db: TPrismaService) {}
  async findAll({
    term,
    perPage,
    page,
    dateFrom,
    dateTo,
  }: IFindAllDto): Promise<IDataWithPagination<GroupModel[]>> {
    try {
      const { data, meta } = await paginate(
        this.db.group,
        {
          orderBy: {
            createdAt: "desc",
          },
          where: {
            ...(term && {
              OR: [
                {
                  description: { contains: term, mode: "insensitive" },
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
          },
          select: selectGroup,
        },
        {
          page: page,
          perPage: perPage,
        }
      );

      return { data: data as GroupModel[], metadata: meta };
    } catch (error: any) {
      console.log("findAllSimple GROUP ERROR::", error);
      throw new AppError({
        message: "Error al obtener los grupos",
        errorCode: "Error",
      });
    }
  }

  async findAllSimple({ term }: IFindAllSimpleDto): Promise<GroupModel[]> {
    try {
      return await this.db.group.findMany({
        where: { description: { contains: term, mode: "insensitive" } },
      });
    } catch (error: any) {
      console.log("findAllSimple GROUP ERROR::", error);
      throw new AppError({
        message: "Error al obtener los grupos",
        errorCode: "Error",
      });
    }
  }
  async create({ ...data }: ICreateGroupDto): Promise<GroupModel> {
    try {
      return await this.db.group.create({
        data,
      });
    } catch (error: any) {
      console.log("create GROUP ERROR::", error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El grupo");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async update(id: string, { ...data }: IUpdateGroupDto): Promise<GroupModel> {
    try {
      return await this.db.group.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      console.log("update GROUP ERROR::", error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El grupo");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findById(id: string): Promise<GroupModel | null> {
    try {
      return await this.db.group.findFirst({
        where: { id },
        select: {
          ...selectGroup,
          permissions: {
            select: {
              ...selectGroupPermission,
              permission: {
                select: selectPermission,
              },
            },
          },
        },
      });
    } catch (error: any) {
      console.log("findById GROUP ERROR::", error);
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El grupo");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async deleteById(id: string): Promise<GroupModel> {
    try {
      return await this.db.group.delete({ where: { id } });
    } catch (error: any) {
      console.log("deleteById GROUP ERROR::", error);
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El grupo");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
}
