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
import {
  CreateOfficeGroupService,
  GetGroupOneByPersonalAndOfficeService,
  UpdateOneOfficeGroupService,
} from "@/office_groups/application/v1";

export class OfficeGroupsController extends BaseController {
  constructor(
    private createOfficeGroupService: CreateOfficeGroupService,
    private getGroupOneByPersonalAndOfficeService: GetGroupOneByPersonalAndOfficeService,
    private updateOneOfficeGroupService: UpdateOneOfficeGroupService
  ) {
    super();
  }

  async create(req: Request, res: Response): Promise<any> {
    try {
      const officeGroup = await this.createOfficeGroupService.execute(req.body);
      return this.ok(res, officeGroup);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    const body = req.body;
    const id = req.params.id as string;

    try {
      const group = await this.updateOneOfficeGroupService.execute(id, body);
      return this.ok(res, group);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async getGroupByPersonalAndOffice(req: Request, res: Response): Promise<any> {
    try {
      const group = await this.getGroupOneByPersonalAndOfficeService.execute(
        req.query as any
      );
      return this.ok(res, group);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
}
