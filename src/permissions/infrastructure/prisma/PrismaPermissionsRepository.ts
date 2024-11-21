import { selectAttributePersonal } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import {
  messageMapPrisma,
  MessageMapTypePrisma,
  TPrismaService,
} from "@/shared/infrastructure/db";
import {
  ICreatePermissionDto,
  IFindAllSimpleDto,
  IUpdatePermissionDto,
} from "../../domain/dtos";
import { PermissionModel } from "../../domain/models";
import { IPermissionsRepository } from "../../domain/repositories";

export class PrismaPermissionsRepository implements IPermissionsRepository {
  constructor(private db: TPrismaService) {}
  async findAllSimple({ term }: IFindAllSimpleDto): Promise<PermissionModel[]> {
    try {
      return await this.db.permission.findMany({
        where: {
          value: { contains: term, mode: "insensitive" },
          description: { contains: term, mode: "insensitive" },
        },
      });
    } catch (error: any) {
      console.log("findAllSimple PERMISSION ERROR::", error);
      throw new AppError({
        message: "Error al obtener los grupos",
        errorCode: "Error",
      });
    }
  }
  async create({ ...data }: ICreatePermissionDto): Promise<PermissionModel> {
    try {
      return await this.db.permission.create({
        data,
      });
    } catch (error: any) {
      console.log("create PERMISSION ERROR::", error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El permiso");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async update(
    id: string,
    { ...data }: IUpdatePermissionDto
  ): Promise<PermissionModel> {
    try {
      return await this.db.permission.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      console.log("update PERMISSION ERROR::", error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El permiso");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findById(id: string): Promise<PermissionModel | null> {
    try {
      return await this.db.permission.findFirst({
        where: { id },
      });
    } catch (error: any) {
      console.log("findById PERMISSION ERROR::", error);
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El permiso");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async deleteById(id: string): Promise<PermissionModel> {
    try {
      return await this.db.permission.delete({ where: { id } });
    } catch (error: any) {
      console.log("deleteById PERMISSION ERROR::", error);
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El permiso");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
}
