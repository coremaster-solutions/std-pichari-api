import {
  DelegateOfficeToPersonalService,
  DeleteOnePersonalOfficeService,
  GetAllOfficesByUserService,
  GetOnePersonalOfficeDelegateByPreviousPersonalIdService,
  ReturnPersonalOfficeService,
  LeaveOfficeToPersonalService,
} from "@/personals_offices/application/v1";
import { BaseController } from "../../models";
import { AppError } from "@/shared/domain/models";
import { Request, Response } from "express";
import { RequestUser } from "@/types";

export class PersonalOfficesController extends BaseController {
  constructor(
    private leaveOfficeToPersonalService: LeaveOfficeToPersonalService,
    private deleteOnePersonalOfficeService: DeleteOnePersonalOfficeService,
    private getAllOfficesByUserService: GetAllOfficesByUserService,
    private returnPersonalOfficeService: ReturnPersonalOfficeService,
    private getOnePersonalOfficeDelegateByPreviousPersonalIdService: GetOnePersonalOfficeDelegateByPreviousPersonalIdService,
    private delegateOfficeToPersonalService: DelegateOfficeToPersonalService
  ) {
    super();
  }

  async delegateOfficeToPersonal(req: Request, res: Response): Promise<any> {
    try {
      const response = await this.delegateOfficeToPersonalService.execute(
        req.body
      );
      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async getOfficeDelegateByPreviousPersonalId(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const response =
        await this.getOnePersonalOfficeDelegateByPreviousPersonalIdService.execute(
          {
            previousPersonalId: req.params.id as string,
          }
        );
      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async getOfficesByUser(req: Request, res: Response): Promise<any> {
    const userId = (req as RequestUser).userId;
    try {
      const response = await this.getAllOfficesByUserService.execute({
        userId: (req.query.personalId as string) ?? userId,
      });
      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async deletePersonalOfficeById(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    try {
      await this.deleteOnePersonalOfficeService.execute({
        id,
      });
      return this.notContent(res);
    } catch (error) {
      if (error instanceof AppError) {
        this.badRequest(res, error.message);
      }
    }
  }

  async leavePersonalOffice(req: Request, res: Response): Promise<any> {
    try {
      const response = await this.leaveOfficeToPersonalService.execute(
        req.body
      );
      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async returnOfficeToPersonal(req: Request, res: Response): Promise<any> {
    try {
      const response = await this.returnPersonalOfficeService.execute({
        id: req.params.id,
      });
      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
}
