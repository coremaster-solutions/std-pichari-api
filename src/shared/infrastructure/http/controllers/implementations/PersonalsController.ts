import {
  CreatePersonalService,
  ForgotPasswordPersonalService,
  GetAllPersonalService,
  GetPersonalDetailService,
  LoginPersonalService,
  MeService,
  RefreshTokenService,
  RemoveOnePersonalService,
  ResetPasswordPersonalService,
  UpdateAvatarPersonalService,
  UpdatePersonalService,
} from "@/personals/application/v1";
import { AppError } from "@/shared/domain/models";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { BaseController } from "../../models";
import { RequestUser } from "@/types";
import { uploadFileMulter } from "../../middleware";

export class PersonalsController extends BaseController {
  constructor(
    private createPersonalService: CreatePersonalService,
    private getAllPersonalService: GetAllPersonalService,
    private loginPersonalService: LoginPersonalService,
    private updatePersonalService: UpdatePersonalService,
    private getPersonalDetailService: GetPersonalDetailService,
    private removeOnePersonalService: RemoveOnePersonalService,
    private refreshTokenService: RefreshTokenService,
    private updateAvatarPersonalService: UpdateAvatarPersonalService,
    private forgotPasswordPersonalService: ForgotPasswordPersonalService,
    private resetPasswordPersonalService: ResetPasswordPersonalService,
    private meService: MeService
  ) {
    super();
  }

  async me(req: Request, res: Response): Promise<any> {
    const userId = (req as RequestUser).userId;
    try {
      const response = await this.meService.execute({
        userId,
      });
      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async resetPassword(req: Request, res: Response): Promise<any> {
    try {
      const response = await this.resetPasswordPersonalService.execute(
        req.body
      );
      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<any> {
    try {
      const response = await this.forgotPasswordPersonalService.execute(
        req.body
      );
      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async uploadAvatar(req: Request, res: Response): Promise<any> {
    const userId = (req as RequestUser).userId;
    uploadFileMulter("avatar").single("file")(req, res, async (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Please send file avatar" });
      }
      try {
        const user = await this.updateAvatarPersonalService.execute({
          id: userId,
          avatarUrl: req.file.path,
        });
        return this.ok(res, user.data.avatarUrl);
      } catch (error) {
        if (error instanceof AppError) {
          this.badRequest(res, error.message);
        }
      }
    });
  }

  async refreshToken(req: Request, res: Response): Promise<any> {
    const { refresh_token } = req.body;

    try {
      const response = await this.refreshTokenService.execute({
        refresh_token,
      });
      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.unauthorized(res, error.message);
      }
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    const { username, password } = req.body;

    try {
      const response = await this.loginPersonalService.execute({
        username,
        password,
      });
      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    const body = req.body;

    try {
      const personal = await this.createPersonalService.execute(body);
      return this.ok(res, personal);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const personals = await this.getAllPersonalService.execute(req.query);

      return this.ok(res, personals);
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
      const personal = await this.updatePersonalService.execute({
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
      const personals = await this.getPersonalDetailService.execute({ id });

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
      await this.removeOnePersonalService.execute({ id });

      return this.notContent(res);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
}
