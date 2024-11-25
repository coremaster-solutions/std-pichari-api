import {
  GetAllDocumentReportService,
  PdfGetAllDocumentService,
} from "@/documents/application/v1";
import { AppError } from "@/shared/domain/models";
import { Request, Response } from "express";
import fs from "fs";
import { BaseController } from "../../models";

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
      const filename = `${new Date().getTime()}-${new Date()
        .toLocaleDateString("es", {
          timeZone: "America/Lima",
        })
        .replace(/\//g, "-")}-reporte-tramites`;

      const pdfBuffer = await this.pdfGetAllDocumentService.execute(req.query);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}.pdf"`
      );

      res.send(pdfBuffer);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
}
