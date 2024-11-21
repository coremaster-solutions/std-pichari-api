import { reportsController } from "@/documents/di";
import { Request, Response, Router } from "express";
import { validateSchema } from "../../middleware";
import { documentGetAllQuerySchema } from "../../schemas";

export class ReportsRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  register() {
    this.router.get(
      "/procedures",
      [validateSchema({ query: documentGetAllQuerySchema })],
      (req: Request, res: Response) =>
        reportsController.findAllProceduresReport(req, res)
    );
    this.router.get(
      "/pdf-procedures",
      [validateSchema({ query: documentGetAllQuerySchema })],
      (req: Request, res: Response) =>
        reportsController.pdfProceduresReport(req, res)
    );

    return this.router;
  }
}
