import { Request, Response } from "express";
import { BaseController } from "../../models";
import { AppError } from "@/shared/domain/models";
import { GetOneTrackingDocumentService } from "@/tracking_documents/application/v1";

export class TrackingDocumentsController extends BaseController {
  constructor(
    private getOneTrackingDocumentService: GetOneTrackingDocumentService
  ) {
    super();
  }

  async findOneById(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const tracking = await this.getOneTrackingDocumentService.execute({ id });

      return this.ok(res, tracking);
    } catch (error) {
      if (error instanceof AppError) {
        if (error.status_code === 404) return this.notFound(res, error.message);
        return this.badRequest(res, error.message);
      }
    }
  }
}
