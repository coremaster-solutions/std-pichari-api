import { AppError } from "@/shared/domain/models";
import {
  IDataWithPagination,
  MessageMapTypePrisma,
  TPrismaService,
  messageMapPrisma,
  paginate,
} from "@/shared/infrastructure/db";
import { ICreateTrackingDto, IUpdateTrackingDto } from "../../domain/dtos";
import {
  TrackingDocumentModel,
  selectTrackingDocument,
} from "../../domain/models";
import {
  IFindAll,
  ITrackingDocumentRepository,
} from "../../domain/repositories";
import { StatusDocumentEnum } from "@/documents/domain/enum";
import { selectAttributePersonal } from "@/personals/domain/repositories";
import { selectDocument } from "@/documents/domain/models";
export class TrackingDocumentPrismaRepository
  implements ITrackingDocumentRepository
{
  constructor(private db: TPrismaService) {}

  async findAllTrackingDocumentsByDestinyPersonalId(
    destinyPersonalId: string
  ): Promise<TrackingDocumentModel[]> {
    try {
      return await this.db.trackingDocument.findMany({
        where: { destinyPersonalId },
      });
    } catch (error: any) {
      console.log(
        "findAllTrackingDocumentsByCreatorId ERROR:::",
        error.message
      );
      throw new AppError({
        message: "Error al obtener los seguimientos de trámites del personal",
        errorCode: "Error",
      });
    }
  }

  async update(
    id: string,
    { documentId, attachments, statusProcedure, ...data }: IUpdateTrackingDto
  ): Promise<TrackingDocumentModel> {
    try {
      return await this.db.trackingDocument.update({
        where: { id },
        data: {
          procedureNumber: data.procedureNumber,
          attentionPriority: data.attentionPriority,
          message: data.message as string,
          previousMessage: data.previousMessage,
          previousStatusProcedure: data.previousStatusProcedure,
          copyDerivation: data.copyDerivation,
          derivedData: data.derivedData,
          ...(statusProcedure && {
            statusProcedure: statusProcedure,
          }),
          ...(documentId && {
            document: {
              connect: { id: documentId },
            },
          }),
          ...(data.originOfficeId && {
            originOffice: {
              connect: { id: data.originOfficeId },
            },
          }),
          ...(data.originPersonalId && {
            originPersonal: {
              connect: { id: data.originPersonalId },
            },
          }),
          ...(data.destinyOfficeId && {
            destinyOffice: {
              connect: { id: data.destinyOfficeId },
            },
          }),
          ...(data.destinyPersonalId && {
            destinyPersonal: { connect: { id: data.destinyPersonalId } },
          }),
          sentDestinations: data.sentDestinations,
          ...(attachments &&
            attachments.length > 0 && {
              attachmentFiles: {
                createMany: {
                  data: attachments.map((url) => ({ fileUrl: url })),
                },
              },
            }),
        },
        include: {
          originOffice: true,
          originPersonal: {
            select: selectAttributePersonal,
          },
          destinyOffice: true,
          destinyPersonal: {
            select: selectAttributePersonal,
          },
          document: true,
        },
      });
    } catch (error: any) {
      console.log(error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        "El seguimiento del trámite"
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async deleteById(id: string): Promise<TrackingDocumentModel | null> {
    try {
      return await this.db.trackingDocument.delete({
        where: { id },
      });
    } catch (error: any) {
      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        "El seguimiento del documento"
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findById(id: string): Promise<TrackingDocumentModel | null> {
    try {
      return await this.db.trackingDocument.findFirst({
        where: { id },
        include: {
          document: {
            select: selectDocument,
          },
        },
      });
    } catch (error: any) {
      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        "El seguimiento del documento"
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async create({
    documentId,
    attachments,
    statusProcedure,
    ...data
  }: ICreateTrackingDto): Promise<TrackingDocumentModel> {
    try {
      return await this.db.trackingDocument.create({
        data: {
          procedureNumber: data.procedureNumber,
          attentionPriority: data.attentionPriority,
          message: data.message as string,
          previousMessage: data.previousMessage,
          previousStatusProcedure: data.previousStatusProcedure,
          copyDerivation: data.copyDerivation,
          derivedData: data.derivedData,
          ...(statusProcedure && {
            statusProcedure: statusProcedure,
          }),
          ...(documentId && {
            document: {
              connect: { id: documentId },
            },
          }),
          ...(data.originOfficeId && {
            originOffice: {
              connect: { id: data.originOfficeId },
            },
          }),
          ...(data.originPersonalId && {
            originPersonal: {
              connect: { id: data.originPersonalId },
            },
          }),
          ...(data.destinyOfficeId && {
            destinyOffice: {
              connect: { id: data.destinyOfficeId },
            },
          }),
          ...(data.destinyPersonalId && {
            destinyPersonal: {
              connect: { id: data.destinyPersonalId },
            },
          }),
          sentDestinations: data.sentDestinations,
          ...(attachments &&
            attachments.length > 0 && {
              attachmentFiles: {
                createMany: {
                  data: attachments.map((url) => ({ fileUrl: url })),
                },
              },
            }),
        },
        include: {
          originOffice: true,
          originPersonal: {
            select: selectAttributePersonal,
          },
          destinyOffice: true,
          destinyPersonal: {
            select: selectAttributePersonal,
          },
          document: {
            select: selectDocument,
          },
        },
      });
    } catch (error: any) {
      console.log(error);

      const message = messageMapPrisma[error.code as MessageMapTypePrisma](
        "El seguimiento del trámite"
      );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findAll({
    documentId,
    page,
    perPage,
    term,
    dateFrom,
    dateTo,
    status,
  }: IFindAll): Promise<IDataWithPagination<TrackingDocumentModel[]>> {
    const { data, meta } = await paginate(
      this.db.trackingDocument,
      {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          ...(term && {
            OR: [
              {
                procedureNumber: { contains: term, mode: "insensitive" },
              },
            ],
          }),
          ...(status && {
            AND: [
              {
                statusProcedure: {
                  in: status?.split(",") as StatusDocumentEnum[],
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
          ...(documentId && {
            OR: [
              {
                documentId,
              },
            ],
          }),
        },
        select: selectTrackingDocument,
      },
      {
        page: page,
        perPage: perPage,
      }
    );

    return { data: data as TrackingDocumentModel[], metadata: meta };
  }
}
