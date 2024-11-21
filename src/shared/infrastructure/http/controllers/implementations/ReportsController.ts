import {
  GetAllDocumentReportService,
  PdfGetAllDocumentService,
} from "@/documents/application/v1";
import { AppError } from "@/shared/domain/models";
import { Request, Response } from "express";
import { BaseController } from "../../models";
import { proceduresPDF } from "@/documents/templates/reports/procedure-list-pdf";

export class ReportsController extends BaseController {
  constructor(
    private getAllDocumentReportService: GetAllDocumentReportService,
    private pdfGetAllDocumentService: PdfGetAllDocumentService
  ) {
    super();
  }

  async findAllProceduresReport(req: Request, res: Response): Promise<any> {
    try {
      const documents = await this.getAllDocumentReportService.execute(
        req.query
      );

      return this.ok(res, documents);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async pdfProceduresReport(req: Request, res: Response): Promise<any> {
    try {
      const filename = `${new Date()
        .toLocaleDateString("es", {
          timeZone: "America/Lima",
        })
        .replace(/\//g, "-")}-reporte-tramites`;

      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${filename}.pdf`,
      });
      const documents = await this.pdfGetAllDocumentService.execute(req.query);

      proceduresPDF(
        documents,
        (chunk: any) => {
          stream.write(chunk);
        },
        () => stream.end()
      );
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
}
