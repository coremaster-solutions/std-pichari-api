import { countsDefaults } from "@/documents/data";
import {
  ICreateCitizenDto,
  ICreateDocumentDto,
  IFindAllArchivedDocument,
  IFindAllInProgressDocument,
  IFindAllObservedDocument,
  IFindAllPendingAndDerivedDocument,
  IFindByDocumentNumber,
  IFindOneWithCitizen,
  IUpdateCitizenDto,
  IUpdateDocumentDto,
} from "@/documents/domain/dtos";
import { StatusDocumentEnum } from "@/documents/domain/enum";
import {
  CitizenModel,
  DocumentModel,
  selectDocument,
} from "@/documents/domain/models";
import {
  IDocumentRepository,
  IFindAllDocument,
} from "@/documents/domain/repositories";
import { DocumentTypeIdEnum } from "@/personals/domain/enum";
import { selectAttributePersonal } from "@/personals/domain/repositories";
import { AppError } from "@/shared/domain/models";
import {
  IDataWithPagination,
  IPaginationMeta,
  MessageMapTypePrisma,
  TPrismaService,
  getPaginationLinks,
  messageMapPrisma,
} from "@/shared/infrastructure/db";
import { getRangeDateOfCurrentMonth, isEmpty } from "@/shared/utils";
import { selectTrackingDocument } from "@/tracking_documents/domain/models";
import { Prisma } from "@prisma/client";

const whereListCount = ({
  destinyOfficeId,
  status,
  startOfMonth,
  endOfMonth,
}: IFindAllDocument): Prisma.DocumentWhereInput => {
  return {
    trackings: {
      some: {
        AND: [
          ...(!isEmpty(destinyOfficeId)
            ? [
                {
                  destinyOfficeId,
                },
              ]
            : []),
          {
            statusProcedure: {
              in: status?.split(",") as StatusDocumentEnum[],
            },
          },
          {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        ],
      },
    },
  };
};
export class DocumentPrismaRepository implements IDocumentRepository {
  constructor(private db: TPrismaService) {}
  async findAllDocumentsByCreatorId(
    creatorId: string
  ): Promise<DocumentModel[]> {
    try {
      return await this.db.document.findMany({
        where: {
          creatorId,
        },
      });
    } catch (error: any) {
      console.log("findAllDocumentsByCreatorId ERROR:::", error.message);
      throw new AppError({
        message: "Error al obtener los documentos del personal",
        errorCode: "Error",
      });
    }
  }
  async countDocumentsMonthByDestinyOfficeAndStatus({
    destinyOfficeId,
    status,
    startOfMonth,
    endOfMonth,
  }: IFindAllDocument): Promise<any> {
    try {
      return await this.db.document.count({
        where: whereListCount({
          destinyOfficeId,
          status,
          startOfMonth,
          endOfMonth,
        }),
      });
    } catch (error: any) {
      console.log(
        "countDocumentsMonthByDestinyOfficeAndStatus ERROR:::",
        error.message
      );
      throw new AppError({
        message:
          "Error al obtener el conteo de los documentos del mes por estado",
        errorCode: "Error",
      });
    }
  }

  async countDocumentsCurrentMonthByDestinyOffice({
    destinyOfficeId,
  }: IFindAllDocument): Promise<any> {
    const startOfMonth =
      getRangeDateOfCurrentMonth().startOfMonth.toISOString();
    const endOfMonth = getRangeDateOfCurrentMonth().endOfMonth.toISOString();
    try {
      const counts = await Promise.all([
        await this.db.document
          .count({
            where: whereListCount({
              destinyOfficeId,
              status: StatusDocumentEnum.PENDING_RECEPTION,
              startOfMonth,
              endOfMonth,
            }),
          })
          .then((count) => ({
            count,
            status: StatusDocumentEnum.PENDING_RECEPTION,
          })),
        await this.db.document
          .count({
            where: whereListCount({
              destinyOfficeId,
              status: StatusDocumentEnum.IN_PROGRESS,
              startOfMonth,
              endOfMonth,
            }),
          })
          .then((count) => ({
            count,
            status: StatusDocumentEnum.IN_PROGRESS,
          })),
        await this.db.document
          .count({
            where: whereListCount({
              destinyOfficeId,
              status: StatusDocumentEnum.OBSERVED,
              startOfMonth,
              endOfMonth,
            }),
          })
          .then((count) => ({
            count,
            status: StatusDocumentEnum.OBSERVED,
          })),
        await this.db.document
          .count({
            where: whereListCount({
              destinyOfficeId,
              status: StatusDocumentEnum.ARCHIVED,
              startOfMonth,
              endOfMonth,
            }),
          })
          .then((count) => ({
            count,
            status: StatusDocumentEnum.ARCHIVED,
          })),
      ]);

      return counts.length > 0 ? counts : countsDefaults;
    } catch (error) {
      console.log("countDocumentsByDestinyOffice ERROR:::", error);
    }
  }

  async findAllByDocumentNumberAndCorrelative({
    citizenDocumentNumber,
    trackingNumberCorrelative,
  }: IFindAllDocument): Promise<DocumentModel[] | undefined> {
    try {
      return await this.db.document.findMany({
        where: {
          ...(citizenDocumentNumber && {
            OR: [
              {
                citizen: {
                  documentNumber: citizenDocumentNumber,
                },
              },
            ],
          }),
          ...(trackingNumberCorrelative && {
            AND: [
              {
                trackings: {
                  some: {
                    procedureNumber: {
                      contains: trackingNumberCorrelative,
                      mode: "insensitive",
                    },
                  },
                },
              },
            ],
          }),
        },
        include: {
          trackings: {
            select: { ...selectTrackingDocument, document: false },
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          documentType: true,
          citizen: true,
          creator: {
            select: selectAttributePersonal,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAllPendingAndDerived({
    term,
    dateFrom,
    dateTo,
    status,
    destinyOfficeId,
    destinyPersonalId,
    documentTypeId,
    ...queryData
  }: IFindAllPendingAndDerivedDocument): Promise<
    IDataWithPagination<DocumentModel[]>
  > {
    const whereList: Prisma.DocumentWhereInput = {
      ...(term && {
        OR: [
          {
            trackings: {
              some: {
                procedureNumber: {
                  contains: term,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            trackings: {
              some: {
                message: {
                  contains: term,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            issue: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            documentNumber: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      }),
      AND: [
        {
          documentTypeId: documentTypeId,
        },
      ],
      trackings: {
        some: {
          AND: [
            {
              destinyOfficeId: destinyOfficeId,
            },
            {
              destinyPersonalId: destinyPersonalId,
            },
          ],
          OR: [
            {
              statusProcedure: {
                in: status?.split(",") as StatusDocumentEnum[],
              },
            },
          ],
        },
      },
    };

    const total = await this.db.document.count({
      where: whereList,
    });
    const { offsetSkip, perPage, lastPage, page } = await getPaginationLinks({
      query: queryData,
      modelTotal: total,
    });

    const data = await this.db.document.findMany({
      where: whereList,
      select: {
        ...selectDocument,
        trackings: {
          select: { ...selectTrackingDocument, document: false },
          where: {
            AND: [
              {
                destinyOfficeId: destinyOfficeId,
              },
              {
                destinyPersonalId: destinyPersonalId,
              },
              {
                statusProcedure: {
                  in: status?.split(",") as StatusDocumentEnum[],
                },
              },
            ],
          },
          orderBy: { procedureNumber: "desc" },
          take: 1,
        },
      },
      take: perPage || undefined,
      skip: offsetSkip || undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: data as DocumentModel[],
      metadata: {
        perPage,
        lastPage,
        currentPage: page,
      } as IPaginationMeta,
    };
  }

  async findAllInProgress({
    term,
    dateFrom,
    dateTo,
    status,
    destinyPersonalId,
    destinyOfficeId,
    documentTypeId,
    ...queryData
  }: IFindAllInProgressDocument): Promise<
    IDataWithPagination<DocumentModel[]>
  > {
    const whereList: Prisma.DocumentWhereInput = {
      ...(term && {
        OR: [
          {
            trackings: {
              some: {
                procedureNumber: {
                  contains: term,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            trackings: {
              some: {
                message: {
                  contains: term,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            issue: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            documentNumber: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      }),
      AND: [
        {
          documentTypeId: documentTypeId,
        },
      ],
      trackings: {
        some: {
          AND: [
            {
              destinyOfficeId: destinyOfficeId,
            },
            {
              destinyPersonalId: destinyPersonalId,
            },
          ],
          OR: [
            {
              statusProcedure: {
                in: status?.split(",") as StatusDocumentEnum[],
              },
            },
          ],
        },
      },
    };

    const total = await this.db.document.count({
      where: whereList,
    });
    const { offsetSkip, perPage, lastPage, page } = await getPaginationLinks({
      query: queryData,
      modelTotal: total,
    });

    const data = await this.db.document.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: whereList,
      select: {
        ...selectDocument,
        trackings: {
          select: { ...selectTrackingDocument, document: false },
          where: {
            AND: [
              {
                destinyOfficeId: destinyOfficeId,
              },
              {
                destinyPersonalId: destinyPersonalId,
              },
              {
                statusProcedure: {
                  in: status?.split(",") as StatusDocumentEnum[],
                },
              },
            ],
          },
          orderBy: { procedureNumber: "desc" },
          take: 1,
        },
      },
      take: perPage || undefined,
      skip: offsetSkip || undefined,
    });

    return {
      data: data as DocumentModel[],
      metadata: {
        perPage,
        lastPage,
        currentPage: page,
      } as IPaginationMeta,
    };
  }

  async findAllObserved({
    term,
    dateFrom,
    dateTo,
    status,
    destinyPersonalId,
    destinyOfficeId,
    documentTypeId,
    ...queryData
  }: IFindAllObservedDocument): Promise<IDataWithPagination<DocumentModel[]>> {
    let response = null;
    const whereList: Prisma.DocumentWhereInput = {
      ...(term && {
        OR: [
          {
            trackings: {
              some: {
                procedureNumber: {
                  contains: term,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            trackings: {
              some: {
                message: {
                  contains: term,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            issue: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            documentNumber: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      }),
      AND: [
        {
          documentTypeId: documentTypeId,
        },
      ],
      trackings: {
        some: {
          AND: [
            {
              destinyOfficeId: destinyOfficeId,
            },
            {
              destinyPersonalId: destinyPersonalId,
            },
          ],
          OR: [
            {
              statusProcedure: {
                in: status?.split(",") as StatusDocumentEnum[],
              },
            },
          ],
        },
      },
    };
    const total = await this.db.document.count({
      where: whereList,
    });
    const { offsetSkip, perPage, lastPage, page } = await getPaginationLinks({
      query: queryData,
      modelTotal: total,
    });

    try {
      response = await this.db.document.findMany({
        where: whereList,
        select: {
          ...selectDocument,
          trackings: {
            select: { ...selectTrackingDocument, document: false },
            where: {
              AND: [
                {
                  destinyOfficeId: destinyOfficeId,
                },
                {
                  destinyPersonalId: destinyPersonalId,
                },
                {
                  statusProcedure: {
                    in: status?.split(",") as StatusDocumentEnum[],
                  },
                },
              ],
            },
            orderBy: { procedureNumber: "desc" },
            take: 1,
          },
        },
        take: perPage || undefined,
        skip: offsetSkip || undefined,
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error: any) {
      console.log(error);
      throw new AppError({
        errorCode: "Error",
        message: "Error en el servidor",
      });
    }

    return {
      data: response as DocumentModel[],
      metadata: {
        perPage,
        lastPage,
        currentPage: page,
      } as IPaginationMeta,
    };
  }

  async findAllArchived({
    term,
    dateFrom,
    dateTo,
    status,
    destinyOfficeId,
    destinyPersonalId,
    ...queryData
  }: IFindAllArchivedDocument): Promise<IDataWithPagination<DocumentModel[]>> {
    let response = null;
    const whereList: Prisma.DocumentWhereInput = {
      ...(term && {
        OR: [
          {
            trackings: {
              some: {
                procedureNumber: {
                  contains: term,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            trackings: {
              some: {
                message: {
                  contains: term,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            issue: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            documentNumber: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      }),
      trackings: {
        some: {
          AND: [
            {
              destinyOfficeId: destinyOfficeId,
            },
            {
              destinyPersonalId: destinyPersonalId,
            },
          ],
          OR: [
            {
              statusProcedure: {
                in: status?.split(",") as StatusDocumentEnum[],
              },
            },
          ],
        },
      },
    };
    const total = await this.db.document.count({
      where: whereList,
    });
    const { offsetSkip, perPage, lastPage, page } = await getPaginationLinks({
      query: queryData,
      modelTotal: total,
    });

    try {
      response = await this.db.document.findMany({
        where: whereList,
        select: {
          ...selectDocument,
          trackings: {
            select: { ...selectTrackingDocument, document: false },
            where: {
              AND: [
                {
                  destinyOfficeId: destinyOfficeId,
                },
                {
                  destinyPersonalId: destinyPersonalId,
                },
                {
                  statusProcedure: {
                    in: status?.split(",") as StatusDocumentEnum[],
                  },
                },
              ],
            },
            orderBy: { procedureNumber: "desc" },
            take: 1,
          },
        },
        take: perPage || undefined,
        skip: offsetSkip || undefined,
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }

    return {
      data: response as DocumentModel[],
      metadata: {
        perPage,
        lastPage,
        currentPage: page,
      } as IPaginationMeta,
    };
  }

  async findByOneWithTrackings({
    procedureNumber,
    correlativeNumber,
    documentNumberCitizen,
  }: IFindOneWithCitizen): Promise<DocumentModel | null> {
    try {
      return await this.db.document.findFirst({
        where: {
          trackings: {
            some: {
              procedureNumber: {
                contains: procedureNumber,
                mode: "insensitive",
              },
            },
          },
          ...(correlativeNumber && {
            trackings: {
              some: {
                procedureNumber: {
                  contains: correlativeNumber,
                  mode: "insensitive",
                },
              },
            },
          }),
          ...(documentNumberCitizen && {
            citizen: {
              documentNumber: documentNumberCitizen,
            },
          }),
        },
        select: {
          ...selectDocument,
          citizen: true,
          trackings: {
            select: selectTrackingDocument,
            orderBy: { createdAt: "desc" },
          },
          documentType: true,
          documentUrl: true,
          attachmentDocumentUrl: true,
        },
      });
    } catch (error: any) {
      console.log(error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El documento");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
  async updateCitizen(
    id: string,
    data: IUpdateCitizenDto
  ): Promise<CitizenModel> {
    try {
      return await this.db.citizen.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      console.log(error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El ciudadano");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
  async findByOneCitizen(
    documentType: DocumentTypeIdEnum,
    documentNumber: string
  ): Promise<CitizenModel | null> {
    try {
      return await this.db.citizen.findFirst({
        where: { documentNumber, documentType },
      });
    } catch (error: any) {
      console.log(error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El ciudadano");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async createCitizen(data: ICreateCitizenDto): Promise<CitizenModel> {
    try {
      const res = await this.db.citizen.create({
        data,
      });
      return res;
    } catch (error: any) {
      console.log(error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El ciudadano");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findByDocumentNumber({
    documentNumber,
    documentTypeId,
    shippingAverage,
  }: IFindByDocumentNumber): Promise<DocumentModel | null> {
    try {
      return await this.db.document.findFirst({
        where: { documentNumber, documentTypeId, shippingAverage },
      });
    } catch (error: any) {
      console.log(error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El documento");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findAll({
    term,
    dateFrom,
    dateTo,
    status,
    destinyOfficeId,
    creatorId,
    documentTypeId,
    destinyPersonalId,
    ...queryData
  }: IFindAllDocument): Promise<IDataWithPagination<DocumentModel[]>> {
    let response = null;
    const whereList: Prisma.DocumentWhereInput = {
      ...(term && {
        OR: [
          {
            trackings: {
              some: {
                procedureNumber: {
                  contains: term,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            trackings: {
              some: {
                message: {
                  contains: term,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            issue: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            documentNumber: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      }),
      AND: [
        {
          documentTypeId: documentTypeId,
        },
      ],
      trackings: {
        some: {
          AND: [
            {
              destinyOfficeId: destinyOfficeId,
            },
            {
              destinyPersonalId: destinyPersonalId,
            },
            {
              statusProcedure: {
                in: status?.split(",") as StatusDocumentEnum[],
              },
            },
          ],
        },
      },
    };
    const total = await this.db.document.count({
      where: whereList,
    });
    const { offsetSkip, perPage, lastPage, page } = await getPaginationLinks({
      query: queryData,
      modelTotal: total,
    });

    try {
      response = await this.db.document.findMany({
        where: whereList,
        select: {
          ...selectDocument,
          trackings: {
            select: { ...selectTrackingDocument, document: false },
            where: {
              AND: [
                {
                  destinyOfficeId: destinyOfficeId,
                },
                {
                  destinyPersonalId: destinyPersonalId,
                },
                {
                  statusProcedure: {
                    in: status?.split(",") as StatusDocumentEnum[],
                  },
                },
              ],
            },
            orderBy: { procedureNumber: "desc" },
            take: 1,
          },
        },
        take: perPage || undefined,
        skip: offsetSkip || undefined,
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }
    return {
      data: response as DocumentModel[],
      metadata: {
        perPage,
        lastPage,
        currentPage: page,
        total,
      } as IPaginationMeta,
    };
  }

  async create({
    documentTypeId,
    citizenId,
    creatorId,
    ...data
  }: ICreateDocumentDto): Promise<DocumentModel> {
    try {
      const res = await this.db.document.create({
        data: {
          ...data,
          documentType: { connect: { id: documentTypeId } },
          ...(citizenId && {
            citizen: { connect: { id: citizenId } },
          }),
          ...(creatorId && {
            creator: { connect: { id: creatorId } },
          }),
          statusSend: "SEND",
        },
      });
      return res;
    } catch (error: any) {
      console.log(error);

      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El documento");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async update(
    id: string,
    { documentTypeId, creatorId, archivistId, ...data }: IUpdateDocumentDto
  ): Promise<DocumentModel> {
    try {
      return await this.db.document.update({
        where: { id },
        data: {
          ...data,
          ...(documentTypeId && {
            documentType: { connect: { id: documentTypeId } },
          }),
          ...(creatorId && {
            creator: { connect: { id: creatorId } },
          }),
          ...(archivistId && { archivist: { connect: { id: archivistId } } }),
        },
        select: selectDocument,
      });
    } catch (error: any) {
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El documento");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findById(id: string): Promise<DocumentModel | null> {
    try {
      return await this.db.document.findUnique({
        where: { id },
        select: selectDocument,
      });
    } catch (error: any) {
      throw new AppError({
        message: error.message,
        errorCode: "Error",
      });
    }
  }
  async deleteById(id: string): Promise<DocumentModel> {
    try {
      return await this.db.document.delete({ where: { id } });
    } catch (error: any) {
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma]("El documento");
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
}
