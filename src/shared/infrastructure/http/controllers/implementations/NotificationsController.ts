import {
  GetAllNotificationService,
  UpdateNotificationService,
} from "@/notifications/application/v1";
import { AppError } from "@/shared/domain/models";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { BaseController } from "../../models";
import { RequestUser } from "@/types";

export class NotificationsController extends BaseController {
  constructor(
    private getAllNotificationService: GetAllNotificationService,
    private updateNotificationService: UpdateNotificationService
  ) {
    super();
  }

  async findAll(req: Request, res: Response): Promise<any> {
    const personalId = (req as RequestUser).userId;
    try {
      const personals = await this.getAllNotificationService.execute({
        ...req.query,
        personalId,
      });

      return this.ok(res, personals);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    const body = req.body as Prisma.NotificationUpdateInput;
    const id = req.params.id as string;

    try {
      const model = await this.updateNotificationService.execute({
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
}
