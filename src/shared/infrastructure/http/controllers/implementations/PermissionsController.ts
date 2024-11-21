import {
  CreatePermissionService,
  DeleteOnePermissionService,
  GetAllSimplePermissionListService,
  GetOnePermissionService,
  UpdateOnePermissionService,
} from "@/permissions/application/v1";
import { AppError } from "@/shared/domain/models";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { BaseController } from "../../models";

export class PermissionsController extends BaseController {
  constructor(
    private createPermissionService: CreatePermissionService,
    private getAllSimplePermissionListService: GetAllSimplePermissionListService,
    private updatePermissionService: UpdateOnePermissionService,
    private getPermissionDetailService: GetOnePermissionService,
    private removeOnePermissionService: DeleteOnePermissionService
  ) {
    super();
  }

  async create(req: Request, res: Response): Promise<any> {
    const body = req.body as Prisma.PermissionCreateInput;
    try {
      const permission = await this.createPermissionService.execute({
        ...body,
      });
      return this.ok(res, permission);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async findAllSimple(req: Request, res: Response): Promise<any> {
    try {
      const permissions = await this.getAllSimplePermissionListService.execute(
        req.query as any
      );

      return this.ok(res, permissions);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    const body = req.body as Prisma.PermissionUpdateInput;
    const id = req.params.id as string;

    try {
      const permission = await this.updatePermissionService.execute({
        ...body,
        id,
      });
      return this.ok(res, permission);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
  async findOneById(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const permissions = await this.getPermissionDetailService.execute({ id });

      return this.ok(res, permissions);
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
      await this.removeOnePermissionService.execute({ id });

      return this.notContent(res);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
}
