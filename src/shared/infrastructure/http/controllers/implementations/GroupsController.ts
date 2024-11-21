import {
  CreateGroupService,
  DeleteOneGroupService,
  GetAllGroupService,
  GetAllSimpleGroupListService,
  GetOneGroupService,
  UpdateOneGroupService,
} from "@/groups/application/v1";
import { AppError } from "@/shared/domain/models";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { BaseController } from "../../models";

export class GroupsController extends BaseController {
  constructor(
    private getAllGroupService: GetAllGroupService,
    private createGroupService: CreateGroupService,
    private getAllSimpleGroupListService: GetAllSimpleGroupListService,
    private updateGroupService: UpdateOneGroupService,
    private getGroupDetailService: GetOneGroupService,
    private removeOneGroupService: DeleteOneGroupService
  ) {
    super();
  }

  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const groups = await this.getAllGroupService.execute(req.query as any);

      return this.ok(res, groups);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    try {
      const group = await this.createGroupService.execute(req.body);
      return this.ok(res, group);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async findAllSimple(req: Request, res: Response): Promise<any> {
    try {
      const groups = await this.getAllSimpleGroupListService.execute(
        req.query as any
      );

      return this.ok(res, groups);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    const body = req.body as Prisma.GroupUpdateInput;
    const id = req.params.id as string;

    try {
      const group = await this.updateGroupService.execute({
        ...body,
        id,
      });
      return this.ok(res, group);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
  async findOneById(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const groups = await this.getGroupDetailService.execute({ id });

      return this.ok(res, groups);
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
      await this.removeOneGroupService.execute({ id });

      return this.notContent(res);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
}
