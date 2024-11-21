import { Request, Response } from "express";
import {
  CreateArchivistService,
  GetAllArchivistService,
  GetOneArchivistService,
  RemoveOneArchivistService,
  UpdateArchivistService,
} from "@/archivists/application/v1";
import { AppError } from "@/shared/domain/models";
import { BaseController } from "../../models";
import { Prisma } from "@prisma/client";
import { RequestUser } from "@/types";

export class ArchivistsController extends BaseController {
  constructor(
    private createArchivistService: CreateArchivistService,
    private getAllArchivistService: GetAllArchivistService,
    private updateArchivistService: UpdateArchivistService,
    private getArchivistDetailService: GetOneArchivistService,
    private removeOneArchivistService: RemoveOneArchivistService
  ) {
    super();
  }

  async create(req: Request, res: Response): Promise<any> {
    const body = req.body as Prisma.ArchivistCreateInput;
    try {
      const archivist = await this.createArchivistService.execute({
        ...body,
      });
      return this.ok(res, archivist);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const archivists = await this.getAllArchivistService.execute(req.query);

      return this.ok(res, archivists);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    const body = req.body as Prisma.ArchivistUpdateInput;
    const id = req.params.id as string;

    try {
      const model = await this.updateArchivistService.execute({
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
      const personals = await this.getArchivistDetailService.execute({ id });

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
      await this.removeOneArchivistService.execute({ id });

      return this.notContent(res);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
}
