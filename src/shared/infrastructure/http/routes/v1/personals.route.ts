import { Request, Response, Router } from "express";
import {
  isAuthenticate,
  uploadFileMulter,
  validateSchema,
} from "../../middleware";
import {
  forgotPasswordBodySchema,
  paramsIdSchema,
  personalCreateBodySchema,
  personalGetAllQuerySchema,
  personalLoginBodySchema,
  personalRefreshTokenBodySchema,
  personalUpdateBodySchema,
  resetPasswordBodySchema,
} from "../../schemas";
import { personalsController } from "@/personals/infrastructure/dependencies";

export class PersonalsRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  register() {
    this.router.get(
      "/",
      validateSchema({
        query: personalGetAllQuerySchema,
      }),
      (req, res) => personalsController.findAll(req, res)
    );
    this.router.post(
      "/",
      validateSchema({
        body: personalCreateBodySchema,
      }),
      (req, res) => personalsController.create(req, res)
    );

    this.router.get("/me", [isAuthenticate], (req: Request, res: Response) =>
      personalsController.me(req, res)
    );

    this.router.put(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
        body: personalUpdateBodySchema,
      }),
      (req, res) => personalsController.update(req, res)
    );

    this.router.post(
      "/refresh-token",
      [
        validateSchema({
          body: personalRefreshTokenBodySchema,
        }),
      ],
      (req: Request, res: Response) =>
        personalsController.refreshToken(req, res)
    );

    this.router.post(
      "/login",
      validateSchema({
        body: personalLoginBodySchema,
      }),
      (req, res) => personalsController.login(req, res)
    );

    this.router.get(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req, res) => personalsController.findOneById(req, res)
    );

    this.router.delete(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req, res) => personalsController.removeOne(req, res)
    );

    this.router.post(
      "/upload-avatar",
      [isAuthenticate],
      (req: Request, res: Response) =>
        personalsController.uploadAvatar(req, res)
    );

    this.router.post(
      "/forgot-password",
      validateSchema({
        body: forgotPasswordBodySchema,
      }),
      (req: Request, res: Response) =>
        personalsController.forgotPassword(req, res)
    );
    this.router.post(
      "/reset-password",
      validateSchema({
        body: resetPasswordBodySchema,
      }),
      (req: Request, res: Response) =>
        personalsController.resetPassword(req, res)
    );

    return this.router;
  }
}
