import { AppError } from "@/shared/domain/models";
import {
  IDataWithPagination,
  MessageMapTypePrisma,
  TPrismaService,
  messageMapPrisma,
  paginate,
} from "@/shared/infrastructure/db";
import { StatusOfficeEnum } from "../../domain/enum";
import { ICreateOfficeDto, IUpdateOfficeDto } from "../../domain/dtos";
import { OfficeModel } from "../../domain/models";
import { IFindAllOffice, IOfficeRepository } from "../../domain/repositories";
import { Prisma } from "@prisma/client";
import { selectAttributePersonal } from "@/personals/domain/repositories";
import { selectPersonalOffice } from "@/personals_offices/domain/models";
import { selectGroup } from "@/groups/domain/models";
import { selectOfficeGroup } from "@/office_groups/domain/models";

const fieldsSelect: Prisma.OfficeSelect = {
  id: true,
  name: true,
  description: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  parentOffice: true,
  officeType: true,
  parentOfficeId: true,
  nextDocumentNumbers: true,
  creator: {
    select: selectAttributePersonal,
  },
  personals: {
    select: {
      ...selectPersonalOffice,
      personal: {
        select: selectAttributePersonal,
      },
    },
  },
  groups: {
    select: {
      ...selectOfficeGroup,
      group: {
        select: selectGroup,
      },
    },
  },
};

export class OfficePrismaRepository implements IOfficeRepository {
  constructor(private db: TPrismaService) {}

  async findByName(name: string): Promise<OfficeModel | null> {
    try {
      return await this.db.office.findFirst({
        where: { name },
        select: fieldsSelect,
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
    status,
  }: IFindAllOffice): Promise<IDataWithPagination<OfficeModel[]>> {
    const { data, meta } = await paginate(
      this.db.office,
      {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          ...(term && {
            OR: [
              {
                name: { contains: term, mode: "insensitive" },
              },
              {
                description: { contains: term, mode: "insensitive" },
              },
            ],
          }),
          ...(status && {
            OR: [
              {
                status: {
                  in: status?.split(",") as StatusOfficeEnum[],
                },
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
        select: { ...fieldsSelect, personals: false },
      },
      {
        page: page,
        perPage: perPage,
      }
    );

    return { data: data as OfficeModel[], metadata: meta };
  }

  async create({
    parentOfficeId,
    creatorId,
    ...data
  }: ICreateOfficeDto): Promise<OfficeModel> {
    try {
      const res = await this.db.office.create({
        data: {
          ...data,
          ...(parentOfficeId && {
            parentOffice: { connect: { id: parentOfficeId } },
          }),
          ...(creatorId && {
            creator: { connect: { id: creatorId } },
          }),
        },
        select: fieldsSelect,
      });
      return res;
    } catch (error: any) {
      console.log(error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("La oficina");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async update(
    id: string,
    { parentOfficeId, creatorId, ...data }: IUpdateOfficeDto
  ): Promise<OfficeModel> {
    try {
      return await this.db.office.update({
        where: { id },
        data: {
          ...data,
          ...(parentOfficeId && {
            parentOffice: { connect: { id: parentOfficeId } },
          }),
          ...(creatorId && {
            creator: { connect: { id: creatorId } },
          }),
        },
        select: fieldsSelect,
      });
    } catch (error: any) {
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("La oficina");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findById(id: string): Promise<OfficeModel | null> {
    try {
      return await this.db.office.findFirst({
        where: { id },
        select: fieldsSelect,
      });
    } catch (error: any) {
      throw new AppError({
        message: error.message,
        errorCode: "Error",
      });
    }
  }
  async deleteById(id: string): Promise<OfficeModel> {
    try {
      return await this.db.office.delete({
        where: { id },
        select: fieldsSelect,
      });
    } catch (error: any) {
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("La oficina");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
}
