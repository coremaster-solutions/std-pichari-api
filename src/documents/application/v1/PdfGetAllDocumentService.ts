import { selectDocument } from "@/documents/domain/models";
import { Envs } from "@/shared/config";
import { prismaService } from "@/shared/infrastructure/db";
import { selectTrackingDocument } from "@/tracking_documents/domain/models";
import { Prisma } from "@prisma/client";
import fs from "fs";
import * as HtmlPdf from "html-pdf-node";
import * as Mustache from "mustache";
import path from "path";
import { StatusDocumentEnum } from "../../domain/enum";
import { IDocumentRepository } from "../../domain/repositories";
const options: HtmlPdf.Options = {
  format: "A4",
  landscape: true,
  margin: {
    top: "0.8cm",
    bottom: "1cm",
    left: "1cm",
    right: "1cm",
  },
};

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

      const templatePath = path.resolve("public/reports/procedure-list.html");

      const template = fs.readFileSync(templatePath, "utf8");

      const data = {
        title: "Reporte de trámites",
        logo: Envs.STAMP_URL,
        date: new Date().toLocaleDateString("es-PE"),
        documents: response?.map(({ trackings, ...doc }) => ({
          ...doc,
          tracking: trackings.at(0),
        })),
      };

      const renderedHtml = Mustache.render(template, data);

      const buffer = new Promise((resolve) => {
        HtmlPdf.generatePdf(
          { content: renderedHtml },
          options,
          (error: Error, pdfBuffer: Buffer) => {
            if (error) {
              throw Error("Error: " + error.message);
            }
            resolve(pdfBuffer);
          }
        );
      });
      return await buffer;
    } catch (error) {
      console.log("ERROR PdfGetAllDocumentService::: ", error);
    }
  }
}
