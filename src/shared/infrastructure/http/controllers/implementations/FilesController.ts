import { Request, Response } from "express";
import { BaseController } from "../../models";
import { IWhatsAppProvider } from "@/shared/infrastructure/containers";
import { AppError } from "@/shared/domain/models";
import { UploadDocumentFileTempService } from "@/documents/application/v1";
import { uploadFileMulterTemp } from "../../middleware";

export class FilesController extends BaseController {
  constructor(
    private whatsAppProvider: IWhatsAppProvider,
    private uploadDocumentFileTempService: UploadDocumentFileTempService
  ) {
    super();
  }

  async uploadDocumentTemp(req: Request, res: Response): Promise<any> {
    uploadFileMulterTemp.single("file")(req, res, async (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Please send file avatar" });
      }
      try {
        const response = await this.uploadDocumentFileTempService.execute({
          documentTempUrl: req.file.path,
        });
        return this.ok(res, response);
      } catch (error) {
        if (error instanceof AppError) {
          this.badRequest(res, error.message);
        }
      }
    });
  }

  async uploadTemp(req: Request, res: Response): Promise<any> {
    const file = req.file;
    if (!file) return this.badRequest(res, "The file is required");
    return res.json(file.path);
  }

  async sendMessage(req: Request, res: Response): Promise<any> {
    try {
      const { phone, message } = req.body;
      await this.whatsAppProvider.sendMessage(phone, message);
      return this.ok(res, {
        message: "Send message successful!",
      });
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
}
