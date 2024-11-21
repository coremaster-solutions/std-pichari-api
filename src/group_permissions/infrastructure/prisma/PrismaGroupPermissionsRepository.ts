import { AppError } from "@/shared/domain/models";
import {
  messageMapPrisma,
  MessageMapTypePrisma,
  TPrismaService,
} from "@/shared/infrastructure/db";
import {
  ICreateGroupPermissionDto,
  IUpdateGroupPermissionDto,
} from "../../domain/dtos";
import { GroupPermissionModel } from "../../domain/models";
import { IGroupPermissionsRepository } from "../../domain/repositories";

export class PrismaGroupPermissionsRepository
  implements IGroupPermissionsRepository
{
  constructor(private db: TPrismaService) {}

  async create({
    groupId,
    permissionId,
  }: ICreateGroupPermissionDto): Promise<GroupPermissionModel | null> {
    try {
      await this.db.$queryRawUnsafe(
        `INSERT INTO group_permissions ("groupId","permissionId") VALUES(uuid($1),uuid($2))`,
        groupId,
        permissionId
      );
      return await this.db.groupPermission.findFirst({
        where: { groupId, permissionId },
      });
    } catch (error: any) {
      console.log("create GROUP PERMISSION ERROR::", error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `El grupo con el groupId: ${groupId} or el permiso con el permissionId: ${permissionId}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async updateById(
    id: string,
    { permissionId }: IUpdateGroupPermissionDto
  ): Promise<GroupPermissionModel | null> {
    try {
      await this.db.$queryRawUnsafe(
        `UPDATE group_permissions SET "permissionId" = uuid($2) WHERE id = uuid($1)`,
        id,
        permissionId
      );
      return await this.db.groupPermission.findFirst({
        where: { id },
      });
    } catch (error: any) {
      console.log("update GROUP PERMISSION ERROR::", error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `El grupo del permiso con el id: ${id}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async deleteByGroupIdAndPermissionId(
    groupId: string,
    permissionId: string
  ): Promise<any> {
    try {
      await this.db.$queryRawUnsafe(
        `DELETE FROM group_permissions WHERE "groupId" = uuid($1) AND "permissionId" = uuid($2)`,
        groupId,
        permissionId
      );
    } catch (error: any) {
      console.log(
        "deleteByGroupIdAndPermissionId GROUP PERMISSION ERROR::",
        error
      );

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `El grupo con el groupId: ${groupId} or el permiso con el permissionId: ${permissionId}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async deleteByGroupId(groupId: string): Promise<any> {
    try {
      await this.db.$queryRawUnsafe(
        `DELETE FROM group_permissions WHERE "groupId" = uuid($1)`,
        groupId
      );
    } catch (error: any) {
      console.log("deleteByGroupId GROUP PERMISSION ERROR::", error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        "El grupo del permiso"
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
}
