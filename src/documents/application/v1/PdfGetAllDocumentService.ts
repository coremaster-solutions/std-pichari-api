import { selectDocument } from "@/documents/domain/models";
import { getPaginationLinks, prismaService } from "@/shared/infrastructure/db";
import { selectTrackingDocument } from "@/tracking_documents/domain/models";
import { Prisma } from "@prisma/client";
import { StatusDocumentEnum } from "../../domain/enum";
import { IDocumentRepository } from "../../domain/repositories";
import { proceduresPDF } from "@/documents/templates/reports/procedure-list-pdf";

interface IRequest {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: StatusDocumentEnum;
  personalId?: string;
  destinyOfficeId?: string;
  destinyPersonalId?: string;
  documentTypeId?: string;
  citizenDocumentNumber?: string;
  trackingNumberCorrelative?: string;
}
export class PdfGetAllDocumentService {
  constructor(private documentRepository: IDocumentRepository) {}

  async execute({ personalId, ...queryData }: IRequest): Promise<any> {
    let response = null;
    const whereList: Prisma.DocumentWhereInput = {
      ...(queryData.term && {
        OR: [
          {
            trackings: {
              some: {
                procedureNumber: {
                  contains: queryData.term,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            issue: {
              contains: queryData.term,
              mode: "insensitive",
            },
          },
          {
            documentNumber: {
              contains: queryData.term,
              mode: "insensitive",
            },
          },
        ],
      }),
      AND: [
        {
          documentTypeId: queryData.documentTypeId,
        },
      ],
      trackings: {
        some: {
          AND: [
            {
              destinyOfficeId: queryData.destinyOfficeId,
            },
            {
              destinyPersonalId: queryData.destinyPersonalId,
            },
            {
              statusProcedure: {
                in: queryData.status?.split(",") as StatusDocumentEnum[],
              },
            },
          ],
        },
      },
    };

    try {
      response = await prismaService.document.findMany({
        where: whereList,
        select: {
          ...selectDocument,
          trackings: {
            select: { ...selectTrackingDocument, document: false },
            where: {
              AND: [
                {
                  destinyOfficeId: queryData.destinyOfficeId,
                },
                {
                  destinyPersonalId: queryData.destinyPersonalId,
                },
                {
                  statusProcedure: {
                    in: queryData.status?.split(",") as StatusDocumentEnum[],
                  },
                },
              ],
            },
            orderBy: { procedureNumber: "desc" },
            take: 1,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }

    return response?.map(({ trackings, ...doc }) => ({
      ...doc,
      tracking: trackings.at(0),
    }));
  }
}
