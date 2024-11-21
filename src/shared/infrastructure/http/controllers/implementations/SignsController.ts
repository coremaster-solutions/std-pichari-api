import { AppError } from "@/shared/domain/models";
import {
  CreateResponseBySignsPeruService,
  GenerateTokenSignsPeruService,
  GetOneSignLogService,
  GetReasonListToSignService,
  ReturnResponseBySignsPeruService,
  UpdateSignLogService,
  UploadSignedDocumentSignsPeruService,
} from "@/signatures/applications/v1";
import { Request, Response } from "express";
import { BaseController } from "../../models";
import { uploadFileMulterTemp } from "../../middleware";

export class SignsController extends BaseController {
  constructor(
    private generateTokenSignsPeruService: GenerateTokenSignsPeruService,
    private createResponseBySignsPeruService: CreateResponseBySignsPeruService,
    private returnResponseBySignsPeruService: ReturnResponseBySignsPeruService,
    private updateSignLogService: UpdateSignLogService,
    private getOneSignLogService: GetOneSignLogService,
    private uploadSignedDocumentSignsPeruService: UploadSignedDocumentSignsPeruService,
    private getReasonListToSignService: GetReasonListToSignService
  ) {
    super();
  }

  async getReasonListToSign(req: Request, res: Response): Promise<any> {
    try {
      const reasonList = await this.getReasonListToSignService.execute();
      return this.ok(res, reasonList);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async getOneSignLog(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    try {
      const signLog = await this.getOneSignLogService.execute({
        id,
      });
      return this.ok(res, signLog);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async updateSignLog(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    try {
      const signLog = await this.updateSignLogService.execute({
        id,
        ...req.body,
      });
      return this.ok(res, signLog);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async getTokenSignPeru(req: Request, res: Response): Promise<any> {
    try {
      const token = await this.generateTokenSignsPeruService.execute();
      return this.ok(res, {
        token,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async returnResponseSignPeru(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    try {
      const response = await this.returnResponseBySignsPeruService.execute({
        id,
      });
      return res.status(200).send(response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async createResponseSignPeru(req: Request, res: Response): Promise<any> {
    try {
      const response = await this.createResponseBySignsPeruService.execute(
        req.body
      );
      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async uploadTemp(req: Request, res: Response): Promise<any> {
    uploadFileMulterTemp.single("signed_file")(req, res, async (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }
      if (!req.file) {
        return res
          .status(400)
          .json({ error: "Please send file document signed" });
      }
      try {
        const response =
          await this.uploadSignedDocumentSignsPeruService.execute({
            id: req.params.id,
            documentUrl: req.file.path,
          });
        return this.ok(res, response);
      } catch (error) {
        if (error instanceof AppError) {
          this.badRequest(res, error.message);
        }
      }
    });
  }
}
