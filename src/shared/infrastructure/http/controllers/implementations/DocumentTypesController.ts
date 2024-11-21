import { Request, Response } from "express";
import {
  CreateDocumentTypeService,
  GetAllDocumentTypeService,
  GetOneDocumentTypeService,
  RemoveOneDocumentTypeService,
  UpdateDocumentTypeService,
} from "@/document_types/application/v1";
import { AppError } from "@/shared/domain/models";
import { BaseController } from "../../models";
import { Prisma } from "@prisma/client";
import { RequestUser } from "@/types";

export class DocumentTypesController extends BaseController {
  constructor(
    private createDocumentTypeService: CreateDocumentTypeService,
    private getAllDocumentTypeService: GetAllDocumentTypeService,
    private updateDocumentTypeService: UpdateDocumentTypeService,
    private getDocumentTypeDetailService: GetOneDocumentTypeService,
    private removeOneDocumentTypeService: RemoveOneDocumentTypeService
  ) {
    super();
  }

  async create(req: Request, res: Response): Promise<any> {
    const body = req.body as Prisma.DocumentTypeCreateInput;
    const creatorId = (req as RequestUser).userId;
    try {
      const personal = await this.createDocumentTypeService.execute({
        ...body,
        creatorId,
      });
      return this.ok(res, personal);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const personals = await this.getAllDocumentTypeService.execute(req.query);

      return this.ok(res, personals);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    const body = req.body as Prisma.DocumentTypeUpdateInput;
    const id = req.params.id as string;

    try {
      const model = await this.updateDocumentTypeService.execute({
        ...body,
        id,
      });
      return this.ok(res, model);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
  async findOneById(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const personals = await this.getDocumentTypeDetailService.execute({ id });

      return this.ok(res, personals);
    } catch (error) {
      if (error instanceof AppError) {
        if (error.status_code === 404) return this.notFound(res, error.message);
        return this.badRequest(res, error.message);
      }
    }
  }
  async removeOne(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      await this.removeOneDocumentTypeService.execute({ id });

      return this.notContent(res);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
}
