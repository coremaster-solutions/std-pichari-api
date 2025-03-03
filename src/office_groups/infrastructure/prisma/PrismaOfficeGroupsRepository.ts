import { AppError } from "@/shared/domain/models";
import {
  messageMapPrisma,
  MessageMapTypePrisma,
  TPrismaService,
} from "@/shared/infrastructure/db";
import {
  ICreateOfficeGroupsDto,
  IDeleteByGroupIdAndOfficeIdAndPersonalId,
  IFindByOfficeIdGroupIdAndPersonalId,
  IUpdateOfficeGroupDto,
} from "../../domain/dtos";
import { OfficeGroupModel } from "../../domain/models";
import { IOfficeGroupsRepository } from "../../domain/repositories";

export class PrismaOfficeGroupsRepository implements IOfficeGroupsRepository {
  constructor(private db: TPrismaService) {}
  async findOnePersonalIdToReturn(
    personalIdToReturn: string
  ): Promise<OfficeGroupModel | null> {
    try {
      return await this.db.officeGroup.findFirst({
        where: { personalIdToReturn },
      });
    } catch (error: any) {
      console.log("findOnePersonalIdToReturn OFFICE GROUPS ERROR::", error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `El grupo de la oficina con el personalIdToReturn: ${personalIdToReturn}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async deleteById(id: string): Promise<any> {
    try {
      return await this.db.officeGroup.delete({
        where: { id },
      });
    } catch (error: any) {
      console.log("deleteById OFFICE GROUPS ERROR::", error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `La oficina del grupo asociado al personal no existe, con el id: ${id}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findOneGroupOfficeByOfficeIdAndGroupId({
    officeId,
    groupId,
  }: Omit<
    ICreateOfficeGroupsDto,
    "personalId"
  >): Promise<OfficeGroupModel | null> {
    try {
      return await this.db.officeGroup.findFirst({
        where: { officeId, groupId },
        include: { group: true },
      });
    } catch (error: any) {
      console.log(
        "findOneGroupOfficeByOfficeIdAndGroupId OFFICE GROUPS ERROR::",
        error
      );

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `La oficina del grupo asociado al personal no existe, con el oficeId: ${officeId} y el groupId: ${groupId}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findOneGroupByOfficeIdAndPersonalId({
    officeId,
    personalId,
  }: Omit<
    ICreateOfficeGroupsDto,
    "groupId"
  >): Promise<OfficeGroupModel | null> {
    try {
      return await this.db.officeGroup.findFirst({
        where: { officeId, personalId },
        include: { group: true },
      });
    } catch (error: any) {
      console.log(
        "findOneGroupByOfficeIdAndPersonalId OFFICE GROUPS ERROR::",
        error
      );

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `La oficina del grupo asociado al personal no existe, con el oficeId: ${officeId} y el personalId: ${personalId}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async updateById(
    id: string,
    data: IUpdateOfficeGroupDto
  ): Promise<OfficeGroupModel | null> {
    try {
      return await this.db.officeGroup.update({
        where: { id },
        data: {
          ...(data.groupId && { group: { connect: { id: data.groupId } } }),
          ...(data.officeId && { office: { connect: { id: data.officeId } } }),
          ...(data.personalId && {
            personal: { connect: { id: data.personalId } },
          }),
          previousDataPersonal: data.previousDataPersonal,
          personalIdToReturn: data.personalIdToReturn,
        },
      });
    } catch (error: any) {
      console.log("updateById OFFICE GROUPS ERROR::", error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `La oficina del grupo asociado al personal no existe, con el id: ${id}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findById(id: string): Promise<OfficeGroupModel | null> {
    try {
      return await this.db.officeGroup.findFirst({
        where: { id },
      });
    } catch (error: any) {
      console.log("findById OFFICE GROUPS ERROR::", error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `La oficina del grupo asociado al personal no existe, con el id: ${id}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findByOfficeIdGroupIdAndPersonalId({
    groupId,
    officeId,
    personalId,
  }: IFindByOfficeIdGroupIdAndPersonalId): Promise<OfficeGroupModel | null> {
    try {
      return await this.db.officeGroup.findFirst({
        where: { officeId, groupId, personalId },
      });
    } catch (error: any) {
      console.log("findByOfficeId OFFICE GROUPS ERROR::", error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `El grupo de la oficina con el officeId: ${officeId}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findByOfficeId(officeId: string): Promise<OfficeGroupModel | null> {
    try {
      return await this.db.officeGroup.findFirst({
        where: { officeId },
      });
    } catch (error: any) {
      console.log("findByOfficeId OFFICE GROUPS ERROR::", error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `El grupo de la oficina con el officeId: ${officeId}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async create({
    groupId,
    officeId,
    personalId,
    personalIdToReturn,
  }: ICreateOfficeGroupsDto): Promise<OfficeGroupModel | null> {
    console.log(groupId, officeId, personalId, personalIdToReturn);

    try {
      await this.db.$queryRawUnsafe(
        `INSERT INTO office_groups ("groupId","officeId","personalId","personalIdToReturn") VALUES($1::uuid,$2::uuid,$3::uuid, $4::uuid)`,
        groupId,
        officeId,
        personalId,
        personalIdToReturn
      );
      return await this.db.officeGroup.findFirst({
        where: { groupId, officeId, personalId },
        include: { group: true },
      });
    } catch (error: any) {
      console.log("create OFFICE GROUPS ERROR::", error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `El grupo con el groupId: ${groupId} or el oficina con el officeId: ${officeId}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async updateByOfficeId(
    officeId: string,
    { groupId, personalId }: IUpdateOfficeGroupDto
  ): Promise<OfficeGroupModel | null> {
    try {
      await this.db.$queryRawUnsafe(
        `UPDATE office_groups SET "groupId" = uuid($2), "personalId" = uuid($3) WHERE "officeId" = uuid($1)`,
        officeId,
        groupId,
        personalId
      );
      return await this.db.officeGroup.findFirst({
        where: { officeId, groupId, personalId },
      });
    } catch (error: any) {
      console.log("update OFFICE GROUPS ERROR::", error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `El grupo de oficina con el officeId: ${groupId}" con el officeId: ${officeId}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async deleteByGroupIdAndOfficeId({
    groupId,
    officeId,
    personalId,
  }: IDeleteByGroupIdAndOfficeIdAndPersonalId): Promise<any> {
    try {
      await this.db.$queryRawUnsafe(
        `DELETE FROM office_groups WHERE "groupId" = uuid($1) AND "officeId" = uuid($2) AND "personalId" = uuid($3)`,
        groupId,
        officeId,
        personalId
      );
    } catch (error: any) {
      console.log("deleteByGroupIdAndOfficeId OFFICE GROUPS ERROR::", error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `El grupo con el groupId: ${groupId} or el oficina con el officeId: ${officeId}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async deleteByOfficeId(groupId: string): Promise<any> {
    try {
      await this.db.$queryRawUnsafe(
        `DELETE FROM office_groups WHERE "groupId" = uuid($1)`,
        groupId
      );
    } catch (error: any) {
      console.log("deleteByGroupId OFFICE GROUPS ERROR::", error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        `El grupo de oficina con el groupId: ${groupId}`
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
}
