import {
  IAttachmentFileRepository,
  IFindAllAttachmentFile,
} from "../../domain/repositories";
import {
  ICreateAttachmentFileDto,
  IUpdateAttachmentFileDto,
} from "../../domain/dtos";
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
import { AttachmentFileModel } from "../../domain/models";
import { AttachmentTypeEnum } from "@/attachment_files/domain/enum";

const fieldsSelect: Prisma.AttachmentFileSelect = {
  id: true,
  fileUrl: true,
  entityId: true,
  entityType: true,
  createdAt: true,
  updatedAt: true,
};

export class AttachmentFilePrismaRepository
  implements IAttachmentFileRepository
{
  constructor(private db: TPrismaService) {}

  async findAll({
    entityId,
    entityType,
  }: IFindAllAttachmentFile): Promise<AttachmentFileModel[] | undefined> {
    try {
      return await this.db.attachmentFile.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          ...(entityId && {
            AND: [
              {
                entityId,
              },
            ],
          }),
          ...(entityType && {
            AND: [
              {
                entityType: entityType as AttachmentTypeEnum,
              },
            ],
          }),
        },
        select: fieldsSelect,
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  async create({
    ...data
  }: ICreateAttachmentFileDto): Promise<AttachmentFileModel> {
    try {
      const res = await this.db.attachmentFile.create({
        data: { ...data },
      });
      return res;
    } catch (error: any) {
      console.log(error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma](
          "El archivo adjunto"
        );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async update(
    id: string,
    data: IUpdateAttachmentFileDto
  ): Promise<AttachmentFileModel> {
    try {
      return await this.db.attachmentFile.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma](
          "El archivo adjunto"
        );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findById(id: string): Promise<AttachmentFileModel | null> {
    try {
      return await this.db.attachmentFile.findFirst({
        where: { id },
      });
    } catch (error: any) {
      throw new AppError({
        message: error.message,
        errorCode: "Error",
      });
    }
  }
  async deleteById(id: string): Promise<AttachmentFileModel> {
    try {
      return await this.db.attachmentFile.delete({ where: { id } });
    } catch (error: any) {
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma](
          "El archivo adjunto"
        );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
}
