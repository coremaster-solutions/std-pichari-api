import { permissionsController } from "@/permissions/di";
import { Request, Response, Router } from "express";
import { isAuthenticate, validateSchema } from "../../middleware";
import {
  permissionCreateBodySchema,
  permissionGetAllQuerySchema,
  permissionUpdateBodySchema,
  paramsIdSchema,
} from "../../schemas";

export class PermissionsRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  register() {
    this.router.get(
      "/",
      [
        isAuthenticate,
        validateSchema({
          query: permissionGetAllQuerySchema,
        }),
      ],
      (req: Request, res: Response) =>
        permissionsController.findAllSimple(req, res)
    );
    this.router.post(
      "/",
      [
        isAuthenticate,
        validateSchema({
          body: permissionCreateBodySchema,
        }),
      ],
      (req: Request, res: Response) => permissionsController.create(req, res)
    );

    this.router.put(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
        body: permissionUpdateBodySchema,
      }),
      (req: Request, res: Response) => permissionsController.update(req, res)
    );

    this.router.get(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req: Request, res: Response) =>
        permissionsController.findOneById(req, res)
    );

    this.router.delete(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req: Request, res: Response) => permissionsController.removeOne(req, res)
    );

    return this.router;
  }
}
