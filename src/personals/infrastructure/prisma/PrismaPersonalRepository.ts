import { AppError } from "@/shared/domain/models";
import {
  IDataWithPagination,
  MessageMapTypePrisma,
  TPrismaService,
  messageMapPrisma,
  paginate,
} from "@/shared/infrastructure/db";
import {
  IFindAllPersonals,
  IPersonalRepository,
  selectAttributePersonal,
} from "../../domain/repositories";
import { ICreatePersonalDto, IUpdatePersonalDto } from "../../domain/dtos";
import { PersonalModel } from "../../domain/models";
import { Prisma } from "@prisma/client";
import { selectPersonalOffice } from "@/personals_offices/domain/models";
import { selectOfficeGroup } from "@/office_groups/domain/models";
import { selectGroup } from "@/groups/domain/models";
import { selectGroupPermission } from "@/group_permissions/domain/models";

const fieldsSelect: Prisma.PersonalSelect = {
  id: true,
  email: true,
  username: true,
  firstName: true,
  first_lastName: true,
  second_lastName: true,
  documentType: true,
  documentNumber: true,
  birthdate: true,
  address: true,
  civilStatus: true,
  ubigeo: true,
  phone: true,
  cellphone: true,
  avatarUrl: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  position: true,
  rucNumber: true,
  role: true,
  positionOptional: true,
  firstLoginAt: true,
  personalOffices: {
    select: { ...selectPersonalOffice, office: true },
  },
};

export class PrismaPersonalRepository implements IPersonalRepository {
  constructor(private db: TPrismaService) {}
  async findByEmail(email: string): Promise<PersonalModel | null> {
    try {
      return await this.db.personal.findUnique({
        where: { email },
        select: fieldsSelect,
      });
    } catch (error: any) {
      throw new AppError({
        message: error.message,
        errorCode: "Error",
        statusCode: 500,
      });
    }
  }

  async findByUsername(username: string): Promise<PersonalModel | null> {
    try {
      return await this.db.personal.findUnique({
        where: { username },
        select: { ...fieldsSelect, password: true },
      });
    } catch (error: any) {
      throw new AppError({
        message: error.message,
        errorCode: "Error",
        statusCode: 500,
      });
    }
  }

  async findAll({
    page,
    perPage,
    term,
    role,
    dateFrom,
    dateTo,
    officeId,
    status,
  }: IFindAllPersonals): Promise<
    IDataWithPagination<Omit<PersonalModel, "password">[]>
  > {
    const { data, meta } = await paginate(
      this.db.personal,
      {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          ...(term && {
            OR: [
              {
                username: { contains: term, mode: "insensitive" },
              },
              {
                firstName: { contains: term, mode: "insensitive" },
              },
              {
                first_lastName: { contains: term, mode: "insensitive" },
              },
              {
                second_lastName: { contains: term, mode: "insensitive" },
              },
              {
                documentNumber: { contains: term, mode: "insensitive" },
              },
              {
                email: { contains: term, mode: "insensitive" },
              },
              {
                office: {
                  name: { contains: term, mode: "insensitive" },
                },
              },
            ],
          }),
          ...(officeId && {
            OR: [
              {
                personalOffices: { some: { officeId } },
              },
            ],
          }),
          ...(status && {
            AND: [{ status }],
          }),
          // array values some
          // ...(role && {
          //   role: { hasSome: role.split(",") },
          // }),
          ...(role && {
            role: { in: role.split(",") },
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

    return { data: data as PersonalModel[], metadata: meta };
  }

  async create({
    ...data
  }: ICreatePersonalDto): Promise<Omit<PersonalModel, "password">> {
    try {
      const { password, ...res } = await this.db.personal.create({
        data,
      });
      return res;
    } catch (error: any) {
      console.log(error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El personal");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async update(
    id: string,
    data: IUpdatePersonalDto
  ): Promise<Omit<PersonalModel, "password">> {
    try {
      const { password, ...res } = await this.db.personal.update({
        where: { id },
        data,
      });
      return res;
    } catch (error: any) {
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El personal");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findById(id: string): Promise<Omit<PersonalModel, "password"> | null> {
    try {
      return await this.db.personal.findFirst({
        where: { id },
        select: {
          ...selectAttributePersonal,
          groupOffices: {
            select: {
              ...selectOfficeGroup,
              office: true,
              group: {
                select: {
                  ...selectGroup,
                  permissions: {
                    select: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    } catch (error: any) {
      console.log(error);
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El personal");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
  async deleteById(id: string): Promise<Omit<PersonalModel, "password">> {
    try {
      return await this.db.personal.delete({ where: { id } });
    } catch (error: any) {
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El personal");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
}
