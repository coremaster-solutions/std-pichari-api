import { selectAttributePersonal } from "@/personals/domain/repositories";
import {
  ICreatePersonalOfficeDto,
  IUpdateMainByPersonaId,
  IUpdatePersonalOfficeDto,
} from "@/personals_offices/domain/dtos";
import { PersonalOfficeModel } from "@/personals_offices/domain/models";
import { IPersonalOfficesRepository } from "@/personals_offices/domain/repositories";
import { AppError } from "@/shared/domain/models";
import {
  messageMapPrisma,
  MessageMapTypePrisma,
  TPrismaService,
} from "@/shared/infrastructure/db";

export class PrismaPersonalOfficesRepository
  implements IPersonalOfficesRepository
{
  constructor(private db: TPrismaService) {}
  async updatePersonalOfficeById(
    id: string,
    { officeId, position }: IUpdatePersonalOfficeDto
  ): Promise<Array<string>> {
    try {
      return await this.db.$queryRawUnsafe(
        `UPDATE personals_offices SET "officeId" = uuid($2), position = $3 WHERE id = uuid($1)`,
        id,
        officeId,
        position
      );
    } catch (error: any) {
      console.log("ERROR updatePersonalOfficeById::", error.message);
      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        "La oficina del personal"
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async create({
    personalId,
    officeId,
    ...data
  }: ICreatePersonalOfficeDto): Promise<PersonalOfficeModel> {
    try {
      return await this.db.personalsOffices.create({
        data: {
          ...data,
          office: { connect: { id: officeId } },
          personal: { connect: { id: personalId } },
        },
      });
    } catch (error: any) {
      console.log(error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        "La oficina del personal"
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async update(
    id: string,
    { personalId, officeId, ...data }: IUpdatePersonalOfficeDto
  ): Promise<PersonalOfficeModel> {
    try {
      return await this.db.personalsOffices.update({
        where: { id },
        data: {
          ...data,
          ...(officeId && { office: { connect: { id: officeId } } }),
          ...(personalId && { personal: { connect: { id: personalId } } }),
        },
      });
    } catch (error: any) {
      console.log(error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        "La oficina del personal"
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findById(id: string): Promise<PersonalOfficeModel | null> {
    try {
      return await this.db.personalsOffices.findFirst({
        where: { id },
        include: {
          personal: {
            select: selectAttributePersonal,
          },
          office: true,
        },
      });
    } catch (error: any) {
      console.log("findById PERSONAL OFFICES ERROR", error.message);
      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        "La oficina del personal"
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async deleteById(id: string): Promise<PersonalOfficeModel> {
    try {
      return await this.db.personalsOffices.delete({ where: { id } });
    } catch (error: any) {
      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        "La oficina del personal"
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
}
