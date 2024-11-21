import {
  ICreateDocumentTypeDto,
  IUpdateDocumentTypeDto,
} from "@/document_types/domain/dtos";
import { DocumentTypeModel } from "@/document_types/domain/models";
import {
  IDocumentTypeRepository,
  IFindAllDocumentType,
} from "@/document_types/domain/repositories";
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

const fieldsSelect: Prisma.DocumentTypeSelect = {
  id: true,
  name: true,
  status: true,
  category: true,
  createdAt: true,
  updatedAt: true,
  creator: {
    select: selectAttributePersonal,
  },
};
export class DocumentTypePrismaRepository implements IDocumentTypeRepository {
  constructor(private db: TPrismaService) {}

  async findAll({
    page,
    perPage,
    term,
    dateFrom,
    dateTo,
    category,
  }: IFindAllDocumentType): Promise<IDataWithPagination<DocumentTypeModel[]>> {
    const { data, meta } = await paginate(
      this.db.documentType,
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
          ...(category && {
            category,
          }),
        },
        select: fieldsSelect,
      },
      {
        page: page,
        perPage: perPage,
      }
    );

    return { data: data as DocumentTypeModel[], metadata: meta };
  }

  async create({
    creatorId,
    ...data
  }: ICreateDocumentTypeDto): Promise<DocumentTypeModel> {
    try {
      const res = await this.db.documentType.create({
        data: { ...data, creator: { connect: { id: creatorId } } },
      });
      return res;
    } catch (error: any) {
      console.log(error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        "El tipo de documento"
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async update(
    id: string,
    data: IUpdateDocumentTypeDto
  ): Promise<DocumentTypeModel> {
    try {
      return await this.db.documentType.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        "El tipo de documento"
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findById(id: string): Promise<DocumentTypeModel | null> {
    try {
      return await this.db.documentType.findUnique({
        where: { id },
      });
    } catch (error: any) {
      throw new AppError({
        message: error.message,
        errorCode: "Error",
      });
    }
  }
  async deleteById(id: string): Promise<DocumentTypeModel> {
    try {
      return await this.db.documentType.delete({ where: { id } });
    } catch (error: any) {
      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        "El tipo de documento"
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
}
