import { Request, Response } from "express";
import {
  CreateOfficeService,
  GetAllOfficeService,
  GetOneOfficeService,
  RemoveOneOfficeService,
  UpdateOfficeService,
} from "@/offices/application/v1";
import { AppError } from "@/shared/domain/models";
import { BaseController } from "../../models";
import { Prisma } from "@prisma/client";
import { RequestUser } from "@/types";

export class OfficesController extends BaseController {
  constructor(
    private createOfficeService: CreateOfficeService,
    private getAllOfficeService: GetAllOfficeService,
    private updateOfficeService: UpdateOfficeService,
    private getOfficeDetailService: GetOneOfficeService,
    private removeOneOfficeService: RemoveOneOfficeService
  ) {
    super();
  }

  async create(req: Request, res: Response): Promise<any> {
    const body = req.body as Prisma.OfficeCreateInput;
    const creatorId = (req as RequestUser).userId;

    try {
      const personal = await this.createOfficeService.execute({
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
      const personals = await this.getAllOfficeService.execute(req.query);

      return this.ok(res, personals);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    const body = req.body as Prisma.OfficeUpdateInput;
    const id = req.params.id as string;

    try {
      const personal = await this.updateOfficeService.execute({
        ...body,
        id,
      });
      return this.ok(res, personal);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
  async findOneById(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const personals = await this.getOfficeDetailService.execute({ id });

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
      await this.removeOneOfficeService.execute({ id });

      return this.notContent(res);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
}
