import { officesController } from "@/offices/di";
import { Request, Response, Router } from "express";
import { isAuthenticate, validateSchema } from "../../middleware";
import {
  officeCreateBodySchema,
  officeGetAllQuerySchema,
  officeUpdateBodySchema,
  paramsIdSchema,
} from "../../schemas";

export class OfficesRoute {
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
          query: officeGetAllQuerySchema,
        }),
      ],
      (req: Request, res: Response) => officesController.findAll(req, res)
    );
    this.router.post(
      "/",
      [
        isAuthenticate,
        validateSchema({
          body: officeCreateBodySchema,
        }),
      ],
      (req: Request, res: Response) => officesController.create(req, res)
    );

    this.router.put(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
        body: officeUpdateBodySchema,
      }),
      (req: Request, res: Response) => officesController.update(req, res)
    );

    this.router.get(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req: Request, res: Response) => officesController.findOneById(req, res)
    );

    this.router.delete(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req: Request, res: Response) => officesController.removeOne(req, res)
    );

    return this.router;
  }
}
